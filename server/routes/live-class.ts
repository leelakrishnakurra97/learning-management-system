import { Router } from 'express';
import { AccessToken, RoomServiceClient, TrackSource } from 'livekit-server-sdk';
import { requireAuth } from '../middleware/auth.js';
import net from 'net';
import nodemailer from 'nodemailer';
import { prisma } from '../lib/prisma.js';

const router = Router();

const rawLivekitUrl = process.env.LIVEKIT_URL || 'http://localhost:7880';
const livekitHost = rawLivekitUrl.replace(/^ws(s)?:\/\//, 'http$1://');
const apiKey = process.env.LIVEKIT_API_KEY || 'devkey';
const apiSecret = process.env.LIVEKIT_API_SECRET || 'secret';


router.get('/live-class/token', requireAuth, async (req, res) => {
  const room = req.query.room as string;
  const participant = req.query.participant as string;
  const isTeacher = req.query.isTeacher === 'true';

  if (!room || !participant) {
    return res.status(400).json({ error: 'Room and participant are required' });
  }

  // Find the class meeting in the database to verify access
  const liveClass = await prisma.liveClass.findFirst({
    where: {
      meetingUrl: {
        equals: room,
        mode: 'insensitive'
      }
    },
    include: {
      subject: true
    }
  });

  // Enforce access control for students
  if (req.auth!.role === 'STUDENT') {
    if (!liveClass) {
      return res.status(403).json({ error: 'Access denied: Meeting does not exist' });
    }
    const student = await prisma.student.findUnique({
      where: { id: req.auth!.userId }
    });
    if (!student || student.classId !== liveClass.subject.classId) {
      return res.status(403).json({ error: 'Access denied: You are not enrolled in this class' });
    }
  }


  const identity = isTeacher 
    ? `${participant}_Teacher_${Date.now()}` 
    : `${participant}_Student_${Date.now()}`;

  const at = new AccessToken(apiKey, apiSecret, {
    identity: identity,
    name: participant,
  });

  const studentSources = [TrackSource.CAMERA, TrackSource.MICROPHONE];
  const teacherSources = [TrackSource.CAMERA, TrackSource.MICROPHONE, TrackSource.SCREEN_SHARE, TrackSource.SCREEN_SHARE_AUDIO];

  at.addGrant({
    roomJoin: true,
    room: room,
    canPublish: true,
    canSubscribe: true,
    canPublishData: true,
    canUpdateOwnMetadata: true, // Needed for "Raise Hand" feature
  });

  try {
    const token = await at.toJwt();
    res.json({ token });
  } catch (error) {
    console.error('Failed to generate LiveKit token:', error);
    res.status(500).json({ error: 'Failed to generate token' });
  }
});

router.post('/live-class/grant-publish', requireAuth, async (req, res) => {
  const { room, identity } = req.body;

  if (!room || !identity) {
    return res.status(400).json({ error: 'Room and identity are required' });
  }

  const roomService = new RoomServiceClient(livekitHost, apiKey, apiSecret);
  try {
    await roomService.updateParticipant(room, identity, undefined, {
      canPublish: true,
      canPublishSources: [TrackSource.CAMERA, TrackSource.MICROPHONE, TrackSource.SCREEN_SHARE, TrackSource.SCREEN_SHARE_AUDIO],
      canSubscribe: true,
      canPublishData: true,
      canUpdateMetadata: true
    });
    res.json({ success: true });
  } catch (e) {
    console.error("Failed to grant publish permission", e);
    res.status(500).json({ success: false, error: 'Failed to grant publish permission' });
  }
});

// ==========================================
// SIMULATED MOCK CLASSROOM BACKEND SYNC SYSTEM
// ==========================================

interface MockParticipant {
  identity: string;
  name: string;
  isTeacher: boolean;
  videoEnabled: boolean;
  audioEnabled: boolean;
  handRaised: boolean;
  screenShareState: 'none' | 'requested' | 'sharing';
  lastSeen: number;
}

interface MockChatMessage {
  id: string;
  fromIdentity: string;
  fromName: string;
  message: string;
  timestamp: number;
}

interface MockRoom {
  roomName: string;
  teacherName: string;
  subjectTitle: string;
  createdAt: number;
  participants: Record<string, MockParticipant>;
  chatMessages: MockChatMessage[];
  whiteboardData: string;
  muteAllActive: boolean;
  stopVideoAllActive: boolean;
  className?: string;
}

const mockRooms: Record<string, MockRoom> = {};

async function checkLivekitServer(): Promise<boolean> {
  let host = 'localhost';
  let port = 7880;

  try {
    const urlStr = rawLivekitUrl.replace(/^ws/, 'http'); // Convert ws/wss to http/https for URL parser compatibility
    const parsedUrl = new URL(urlStr);
    host = parsedUrl.hostname;
    if (parsedUrl.port) {
      port = parseInt(parsedUrl.port);
    } else {
      port = parsedUrl.protocol === 'https:' ? 443 : 80;
    }
  } catch (err) {
    console.error('Failed to parse LiveKit URL:', err);
  }

  return new Promise((resolve) => {
    const socket = new net.Socket();
    socket.setTimeout(1000); // Allow up to 1 second for external servers
    socket.on('connect', () => {
      socket.destroy();
      resolve(true);
    });
    socket.on('timeout', () => {
      socket.destroy();
      resolve(false);
    });
    socket.on('error', () => {
      resolve(false);
    });
    socket.connect(port, host);
  });
}


router.get('/live-class/status', async (req, res) => {
  const isAvailable = await checkLivekitServer();
  res.json({ livekitAvailable: isAvailable });
});

router.get('/live-class/mock/active', (req, res) => {
  const activeRooms = Object.values(mockRooms)
    .filter(room => Object.values(room.participants).some(p => p.isTeacher))
    .map(room => {
      const teacher = Object.values(room.participants).find(p => p.isTeacher);
      return {
        roomName: room.roomName,
        teacherName: teacher?.name || room.teacherName || 'Teacher',
        subjectTitle: room.subjectTitle || 'General Lecture',
        className: room.className || 'Class 11',
        createdAt: room.createdAt
      };
    });
  res.json({ rooms: activeRooms });
});

router.get('/live-class/mock/verify', requireAuth, async (req, res) => {
  const roomName = req.query.roomName as string;
  if (!roomName) {
    return res.status(400).json({ error: 'roomName is required' });
  }

  // Find the class meeting in DB
  const liveClass = await prisma.liveClass.findFirst({
    where: {
      meetingUrl: {
        equals: roomName,
        mode: 'insensitive'
      }
    },
    include: {
      subject: true
    }
  });

  // Access control check for students
  if (req.auth!.role === 'STUDENT') {
    if (!liveClass) {
      return res.status(403).json({ error: 'Access denied: Meeting does not exist' });
    }
    const student = await prisma.student.findUnique({
      where: { id: req.auth!.userId }
    });
    if (!student || student.classId !== liveClass.subject.classId) {
      return res.status(403).json({ error: 'Access denied: You are not enrolled in this class' });
    }
  }

  const room = mockRooms[roomName] || Object.values(mockRooms).find(r => r.roomName.toUpperCase() === roomName.toUpperCase());
  const isAvailable = room && Object.values(room.participants).some(p => p.isTeacher);

  res.json({ 
    exists: !!isAvailable,
    teacherName: room ? Object.values(room.participants).find(p => p.isTeacher)?.name : undefined,
    subjectTitle: room ? room.subjectTitle : undefined
  });
});

router.post('/live-class/mock/join', requireAuth, async (req, res) => {
  const { roomName, participantName, identity, isTeacher, videoEnabled, audioEnabled, subjectTitle, className } = req.body;
  if (!roomName || !identity) {
    return res.status(400).json({ error: 'roomName and identity are required' });
  }

  // Find the class meeting in DB
  const liveClass = await prisma.liveClass.findFirst({
    where: {
      meetingUrl: {
        equals: roomName,
        mode: 'insensitive'
      }
    },
    include: {
      subject: true
    }
  });

  // Access control check for students
  if (req.auth!.role === 'STUDENT') {
    if (!liveClass) {
      return res.status(403).json({ error: 'Access denied: Meeting does not exist' });
    }
    const student = await prisma.student.findUnique({
      where: { id: req.auth!.userId }
    });
    if (!student || student.classId !== liveClass.subject.classId) {
      return res.status(403).json({ error: 'Access denied: You are not enrolled in this class' });
    }
  }

  if (!mockRooms[roomName]) {
    mockRooms[roomName] = {
      roomName,
      teacherName: isTeacher ? participantName : '',
      subjectTitle: subjectTitle || 'General Lecture',
      className: className || 'Class 11',
      createdAt: Date.now(),
      participants: {},
      chatMessages: [],
      whiteboardData: '[]',
      muteAllActive: false,
      stopVideoAllActive: false,
    };
  } else {
    if (isTeacher) {
      mockRooms[roomName].teacherName = participantName;
      if (subjectTitle) {
        mockRooms[roomName].subjectTitle = subjectTitle;
      }
      if (className) {
        mockRooms[roomName].className = className;
      }
    }
  }

  const room = mockRooms[roomName];
  room.participants[identity] = {
    identity,
    name: participantName,
    isTeacher: !!isTeacher,
    videoEnabled: !!videoEnabled,
    audioEnabled: !!audioEnabled,
    handRaised: false,
    screenShareState: 'none',
    lastSeen: Date.now(),
  };

  res.json({ success: true, room });
});

router.post('/live-class/mock/sync', requireAuth, async (req, res) => {
  const { roomName, identity, videoEnabled, audioEnabled, handRaised, screenShareState, whiteboardData, newChatMessage } = req.body;
  if (!roomName || !identity) {
    return res.status(400).json({ error: 'roomName and identity are required' });
  }

  // Find the class meeting in DB
  const liveClass = await prisma.liveClass.findFirst({
    where: {
      meetingUrl: {
        equals: roomName,
        mode: 'insensitive'
      }
    },
    include: {
      subject: true
    }
  });

  // Access control check for students
  if (req.auth!.role === 'STUDENT') {
    if (!liveClass) {
      return res.status(403).json({ error: 'Access denied: Meeting does not exist' });
    }
    const student = await prisma.student.findUnique({
      where: { id: req.auth!.userId }
    });
    if (!student || student.classId !== liveClass.subject.classId) {
      return res.status(403).json({ error: 'Access denied: You are not enrolled in this class' });
    }
  }

  const room = mockRooms[roomName];
  if (!room) {
    return res.status(404).json({ error: 'Room not found' });
  }

  const part = room.participants[identity];
  if (part) {
    part.lastSeen = Date.now();
    if (videoEnabled !== undefined) part.videoEnabled = !!videoEnabled;
    if (audioEnabled !== undefined) part.audioEnabled = !!audioEnabled;
    if (handRaised !== undefined) part.handRaised = !!handRaised;
    if (screenShareState !== undefined) part.screenShareState = screenShareState;
  } else {
    room.participants[identity] = {
      identity,
      name: identity.split('_')[0],
      isTeacher: identity.includes('_Teacher_'),
      videoEnabled: !!videoEnabled,
      audioEnabled: !!audioEnabled,
      handRaised: !!handRaised,
      screenShareState: screenShareState || 'none',
      lastSeen: Date.now(),
    };
  }

  const updatedPart = room.participants[identity];

  if (room.muteAllActive && !updatedPart?.isTeacher) {
    if (updatedPart) updatedPart.audioEnabled = false;
  }
  if (room.stopVideoAllActive && !updatedPart?.isTeacher) {
    if (updatedPart) updatedPart.videoEnabled = false;
  }

  if (whiteboardData !== undefined) {
    room.whiteboardData = whiteboardData;
  }

  if (newChatMessage) {
    const chatMsg: MockChatMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      fromIdentity: identity,
      fromName: updatedPart?.name || identity.split('_')[0],
      message: newChatMessage,
      timestamp: Date.now(),
    };
    room.chatMessages.push(chatMsg);
  }

  const now = Date.now();
  Object.keys(room.participants).forEach((id) => {
    if (now - room.participants[id].lastSeen > 8000) {
      delete room.participants[id];
    }
  });

  res.json({
    success: true,
    participants: Object.values(room.participants),
    chatMessages: room.chatMessages,
    whiteboardData: room.whiteboardData,
    muteAllActive: room.muteAllActive,
    stopVideoAllActive: room.stopVideoAllActive,
  });
});

router.post('/live-class/mock/host-command', requireAuth, async (req, res) => {
  if (req.auth!.role !== 'TEACHER') {
    return res.status(403).json({ error: 'Forbidden: Only teachers can issue host commands' });
  }

  const { roomName, command, targetIdentity } = req.body;
  const room = mockRooms[roomName];
  if (!room) {
    return res.status(404).json({ error: 'Room not found' });
  }

  if (command === 'mute-all') {
    room.muteAllActive = true;
    Object.values(room.participants).forEach((p) => {
      if (!p.isTeacher) p.audioEnabled = false;
    });
    setTimeout(() => { room.muteAllActive = false; }, 1500);
  } else if (command === 'stop-video-all') {
    room.stopVideoAllActive = true;
    Object.values(room.participants).forEach((p) => {
      if (!p.isTeacher) p.videoEnabled = false;
    });
    setTimeout(() => { room.stopVideoAllActive = false; }, 1500);
  } else if (command === 'approve-screenshare') {
    if (room.participants[targetIdentity]) {
      room.participants[targetIdentity].screenShareState = 'sharing';
      Object.values(room.participants).forEach((p) => {
        if (p.identity !== targetIdentity && p.screenShareState === 'sharing') {
          p.screenShareState = 'none';
        }
      });
    }
  } else if (command === 'deny-screenshare') {
    if (room.participants[targetIdentity]) {
      room.participants[targetIdentity].screenShareState = 'none';
    }
  } else if (command === 'kick') {
    delete room.participants[targetIdentity];
  }

  res.json({ success: true });
});

router.post('/live-class/mock/leave', requireAuth, async (req, res) => {
  const { roomName, identity } = req.body;
  const room = mockRooms[roomName];
  if (room && room.participants[identity]) {
    delete room.participants[identity];
  }
  res.json({ success: true });
});

// Create/Schedule a Live Class in the Database
router.post('/live-classes', requireAuth, async (req, res) => {
  const { title, description, classLevel, date, startTime, endTime, roomCode } = req.body;

  if (!title || !classLevel || !date || !startTime || !endTime) {
    return res.status(400).json({ error: 'title, classLevel, date, startTime, and endTime are required' });
  }

  try {
    let teacherId = req.auth!.userId;
    const teacher = await prisma.teacher.findUnique({ where: { id: req.auth!.userId } });
    if (!teacher) {
      const anyTeacher = await prisma.teacher.findFirst();
      if (anyTeacher) {
        teacherId = anyTeacher.id;
      } else {
        return res.status(400).json({ error: 'No teacher profile found to associate with live class' });
      }
    }

    const classRecord = await prisma.class.findFirst({
      where: { name: classLevel }
    });
    if (!classRecord) {
      return res.status(404).json({ error: 'Class not found' });
    }

    const user = await prisma.user.findUnique({ where: { id: req.auth!.userId } });
    const teacherSubject = user?.role === 'TEACHER' ? 'Physics' : 'Mathematics';

    let subjectRecord = await prisma.subject.findFirst({
      where: {
        classId: classRecord.id,
        name: { contains: teacherSubject, mode: 'insensitive' }
      }
    });
    if (!subjectRecord) {
      subjectRecord = await prisma.subject.findFirst({
        where: { classId: classRecord.id }
      });
    }
    if (!subjectRecord) {
      return res.status(404).json({ error: 'No subject registered for this class' });
    }

    let start: Date;
    let end: Date;
    try {
      const parseTime = (timeStr: string) => {
        const parts = timeStr.match(/^(\d+):(\d+)\s*(AM|PM)$/i);
        if (parts) {
          let hours = parseInt(parts[1]);
          const minutes = parseInt(parts[2]);
          const ampm = parts[3].toUpperCase();
          if (ampm === 'PM' && hours < 12) hours += 12;
          if (ampm === 'AM' && hours === 12) hours = 0;
          return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;
        }
        return timeStr;
      };

      const startFormatted = parseTime(startTime);
      const endFormatted = parseTime(endTime);

      start = new Date(`${date}T${startFormatted}`);
      end = new Date(`${date}T${endFormatted}`);

      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        throw new Error('Invalid date format');
      }
    } catch {
      start = new Date();
      end = new Date(Date.now() + 60 * 60 * 1000);
    }

    const generateRoomCode = () => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let code = '';
      for (let i = 0; i < 8; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return code;
    };
    const roomName = generateRoomCode();

    const liveClass = await prisma.liveClass.create({
      data: {
        title,
        description: description || '',
        subjectId: subjectRecord.id,
        teacherId,
        meetingUrl: roomName,
        scheduledStart: start,
        scheduledEnd: end,
        status: 'UPCOMING'
      }
    });

    try {
      const professorName = user ? `${user.firstName} ${user.lastName}` : 'Professor';
      const dbNotif = await prisma.notification.create({
        data: {
          title: 'New Live Class Scheduled',
          body: `Professor ${professorName} scheduled a live class: "${title}" for ${subjectRecord.name}. Date: ${date}, Time: ${startTime}. Join Code: ${roomName}.`,
          type: 'LIVE_CLASS',
          data: {
            liveClassId: liveClass.id,
            roomName: roomName
          }
        }
      });

      const students = await prisma.student.findMany({
        where: { classId: classRecord.id },
        include: {
          user: true
        }
      });

      if (students.length > 0) {
        await prisma.userNotification.createMany({
          data: students.map(s => ({
            userId: s.id,
            notificationId: dbNotif.id,
            isRead: false
          })),
          skipDuplicates: true
        });

        // SMTP Email Dispatch
        try {
          const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // use STARTTLS
            auth: {
              user: 'nexoralmslearning@gmail.com',
              pass: 'zrgiibdlrvsahxwn', // Gmail App password
            },
            tls: {
              rejectUnauthorized: false,
            },
          });

          const emailPromises = students.map(s => {
            if (!s.user.email) return Promise.resolve();
            const mailOptions = {
              from: '"Nexora Learning" <nexoralmslearning@gmail.com>',
              to: s.user.email.toLowerCase(),
              subject: `Live Class Scheduled - Join Code: ${roomName}`,
              html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 0px; background-color: #ffffff;">
                  <h2 style="color: #4f46e5; text-align: center; margin-bottom: 24px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em;">Nexora Learning</h2>
                  <p style="font-size: 14px; color: #334155; line-height: 1.6;">Hello ${s.user.firstName} ${s.user.lastName},</p>
                  <p style="font-size: 14px; color: #334155; line-height: 1.6;">A new live class has been scheduled for your class: <strong>${classLevel}</strong>.</p>
                  
                  <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 16px; margin: 20px 0; border-radius: 0px;">
                    <p style="margin: 0 0 8px 0; font-size: 14px; color: #334155;"><strong>Title:</strong> ${title}</p>
                    <p style="margin: 0 0 8px 0; font-size: 14px; color: #334155;"><strong>Subject:</strong> ${subjectRecord.name}</p>
                    <p style="margin: 0 0 8px 0; font-size: 14px; color: #334155;"><strong>Instructor:</strong> Professor ${professorName}</p>
                    <p style="margin: 0 0 8px 0; font-size: 14px; color: #334155;"><strong>Date:</strong> ${date}</p>
                    <p style="margin: 0 0 8px 0; font-size: 14px; color: #334155;"><strong>Time:</strong> ${startTime} - ${endTime}</p>
                    <p style="margin: 8px 0 0 0; font-size: 16px; color: #4f46e5;"><strong>Join Code:</strong> <span style="font-family: monospace; background-color: #e2e8f0; padding: 2px 6px; font-weight: bold; border-radius: 0px;">${roomName}</span></p>
                  </div>
                  
                  <p style="font-size: 14px; color: #334155; line-height: 1.6;">To join the session, log in to your Nexora Learning Portal, go to "Start live session", and enter the join code above, or click the live class card on your dashboard when the session is active.</p>
                  
                  <p style="font-size: 13px; color: #64748b; line-height: 1.6;">Note: Access is restricted to students of the scheduled class. Do not share the join code with students of other classes.</p>
                  
                  <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 32px 0;" />
                  <p style="font-size: 11px; color: #64748b; text-align: center; line-height: 1.5;">
                    This is an automated notification from Nexora Learning. Please do not reply to this email.
                  </p>
                </div>
              `,
            };
            return transporter.sendMail(mailOptions);
          });

          await Promise.all(emailPromises);
          console.log(`✅ Meeting schedule emails sent successfully to class students`);
        } catch (emailErr) {
          console.error('❌ Failed to send schedule emails via SMTP:', emailErr);
        }
      }
    } catch (notifErr) {
      console.warn('Failed to send live class notification:', notifErr);
    }

    res.status(201).json({ success: true, liveClass });
  } catch (err) {
    console.error('Failed to create live class:', err);
    res.status(500).json({ error: 'Failed to create live class' });
  }
});

// Fetch all Live Classes in the Database
router.get('/live-classes', requireAuth, async (req, res) => {
  try {
    const liveClasses = await prisma.liveClass.findMany({
      include: {
        subject: {
          include: {
            class: true
          }
        },
        teacher: {
          include: {
            user: true
          }
        }
      },
      orderBy: { scheduledStart: 'asc' }
    });

    const mapped = liveClasses.map(lc => {
      let status = 'Upcoming';
      if (lc.status === 'LIVE') status = 'Live';
      else if (lc.status === 'COMPLETED') status = 'Completed';
      else if (lc.status === 'CANCELLED') status = 'Cancelled';

      const dateStr = lc.scheduledStart.toISOString().split('T')[0];
      const startTimeStr = lc.scheduledStart.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
      const endTimeStr = lc.scheduledEnd.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

      return {
        id: lc.id,
        title: lc.title,
        classLevel: lc.subject.class.name,
        date: dateStr,
        startTime: startTimeStr,
        endTime: endTimeStr,
        type: 'Live Class',
        description: lc.description || '',
        status,
        roomName: lc.meetingUrl,
        teacherName: `${lc.teacher.user.firstName} ${lc.teacher.user.lastName}`,
        subjectTitle: lc.subject.name
      };
    });

    res.json({ meetings: mapped });
  } catch (err) {
    console.error('Failed to fetch live classes:', err);
    res.status(500).json({ error: 'Failed to fetch live classes' });
  }
});

// Update Status of a Live Class
router.patch('/live-class/:id/status', requireAuth, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  let dbStatus: any = 'UPCOMING';
  if (status === 'Live') dbStatus = 'LIVE';
  else if (status === 'Completed') dbStatus = 'COMPLETED';
  else if (status === 'Upcoming') dbStatus = 'UPCOMING';

  try {
    const updated = await prisma.liveClass.update({
      where: { id },
      data: { status: dbStatus }
    });
    res.json({ success: true, liveClass: updated });
  } catch (err) {
    console.error('Failed to update live class status:', err);
    res.status(500).json({ error: 'Failed to update live class status' });
  }
});

export default router;
