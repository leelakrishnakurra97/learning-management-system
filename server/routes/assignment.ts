import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { requireAuth } from '../middleware/auth.js';
import multer from 'multer';
import { uploadToMinio, buildStorageKey } from '../lib/minio.js';

const router = Router();

// Retrieve all assignments (student filters by class subjects; teacher views all with submissions)
router.get('/assignments', requireAuth, async (req, res) => {
  try {
    let classId: string | undefined;
    let studentId: string | undefined;

    if (req.auth!.role === 'STUDENT') {
      const student = await prisma.student.findUnique({
        where: { id: req.auth!.userId },
        include: { class: true }
      });
      if (student) {
        classId = student.classId;
        studentId = student.id;
      }
    }

    const assignments = await prisma.assignment.findMany({
      where: classId ? {
        topic: {
          chapter: {
            unit: {
              subject: {
                classId: classId
              }
            }
          }
        }
      } : undefined,
      include: {
        topic: {
          include: {
            chapter: {
              include: {
                unit: {
                  include: {
                    subject: {
                      include: {
                        class: true
                      }
                    }
                  }
                }
              }
            }
          }
        },
        submissions: studentId ? {
          where: { studentId: studentId },
          include: {
            feedback: {
              include: {
                teacher: {
                  include: {
                    user: true
                  }
                }
              }
            }
          }
        } : {
          include: {
            student: { include: { user: true } },
            feedback: true
          }
        }
      },
      orderBy: { deadline: 'asc' }
    });

    const result: any[] = [];
    assignments.forEach(a => {
      const formattedDeadline = a.deadline ? a.deadline.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : '';
      const rawDeadline = a.deadline ? a.deadline.toISOString() : '';
      const className = a.topic.chapter.unit.subject.class.name;

      if (req.auth!.role !== 'STUDENT') {
        // For teachers/admins, output an item for each student submission, or a pending item if none
        if (!a.submissions || a.submissions.length === 0) {
          result.push({
            id: a.id,
            title: a.title,
            description: a.description,
            subjectId: a.topic.chapter.unit.subjectId,
            subjectTitle: a.topic.chapter.unit.subject.name,
            deadline: formattedDeadline,
            rawDeadline: rawDeadline,
            className: className,
            points: a.maxMarks,
            status: 'Pending'
          });
        } else {
          a.submissions.forEach(sub => {
            let status = 'Submitted';
            let grade = undefined;
            let feedback = undefined;
            if (sub.status === 'GRADED') {
              status = 'Graded';
              grade = sub.feedback ? `${sub.feedback.marksObtained}/100` : undefined;
              feedback = sub.feedback?.comment || undefined;
            }

            result.push({
              id: `${a.id}_${sub.id}`,
              assignmentId: a.id,
              submissionId: sub.id,
              title: a.title,
              description: a.description,
              subjectId: a.topic.chapter.unit.subjectId,
              subjectTitle: a.topic.chapter.unit.subject.name,
              deadline: formattedDeadline,
              rawDeadline: rawDeadline,
              className: className,
              points: a.maxMarks,
              status: status,
              submissionFile: sub.submissionUrl,
              grade: grade,
              feedback: feedback,
              studentName: `${sub.student.user.firstName} ${sub.student.user.lastName}`,
              submittedAt: sub.submittedAt ? sub.submittedAt.toISOString() : ''
            });
          });
        }
      } else {
        // For students, output a single item for the assignment with their submission info
        const submission = a.submissions?.[0];
        let status = 'Pending';
        let submissionFile = undefined;
        let grade = undefined;
        let feedback = undefined;
        let teacherName = undefined;

        if (submission) {
          submissionFile = submission.submissionUrl;
          if (submission.status === 'SUBMITTED') {
            status = 'Submitted';
          } else if (submission.status === 'GRADED') {
            status = 'Graded';
            grade = submission.feedback ? `${submission.feedback.marksObtained}/100` : undefined;
            feedback = submission.feedback?.comment || undefined;
            teacherName = submission.feedback ? `${submission.feedback.teacher.user.firstName} ${submission.feedback.teacher.user.lastName}` : undefined;
          }
        }

        result.push({
          id: a.id,
          title: a.title,
          description: a.description,
          subjectId: a.topic.chapter.unit.subjectId,
          subjectTitle: a.topic.chapter.unit.subject.name,
          deadline: formattedDeadline,
          rawDeadline: rawDeadline,
          className: className,
          points: a.maxMarks,
          status: status,
          submissionFile: submissionFile,
          grade: grade,
          feedback: feedback,
          teacherName: teacherName
        });
      }
    });

    res.json({ assignments: result });
  } catch (err) {
    console.error('Failed to fetch assignments:', err);
    res.status(500).json({ error: 'Failed to fetch assignments' });
  }
});

// Submit assignment solution (student)
const studentUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max
  fileFilter: (_req, file, cb) => {
    const allowed = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'image/webp',
      'application/zip',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // docx
      'application/msword' // doc
    ];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`File type not allowed: ${file.mimetype}`));
    }
  }
});

const uploadSingle = studentUpload.single('file');

router.post('/assignments/:assignmentId/submit', requireAuth, (req, res, next) => {
  uploadSingle(req, res, (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'File size exceeds 5MB limit. Please upload a smaller file.' });
      }
      return res.status(400).json({ error: err.message || 'File upload failed' });
    }
    next();
  });
}, async (req, res) => {
  try {
    const student = await prisma.student.findUnique({
      where: { id: req.auth!.userId },
      include: { class: true }
    });
    if (!student) {
      return res.status(403).json({ error: 'Student profile required' });
    }

    // Check deadline
    const assignment = await prisma.assignment.findUnique({
      where: { id: req.params.assignmentId },
      include: {
        topic: {
          include: {
            chapter: {
              include: {
                unit: {
                  include: {
                    subject: true
                  }
                }
              }
            }
          }
        }
      }
    });
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }
    if (assignment.deadline && new Date() > new Date(assignment.deadline)) {
      return res.status(400).json({ error: 'The deadline for this assignment has passed. Submissions are closed.' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'file is required' });
    }

    const className = student.class?.name || 'general';
    const subjectName = assignment.topic.chapter.unit.subject.name || 'general';

    const key = buildStorageKey('assignment', className, subjectName, req.file.originalname);
    let submissionUrl: string;

    try {
      submissionUrl = await uploadToMinio(key, req.file.buffer, req.file.mimetype);
    } catch (minioErr) {
      console.warn('MinIO upload failed, using local path:', minioErr);
      submissionUrl = `/uploads/${key}`;
    }

    const submission = await prisma.assignmentSubmission.upsert({
      where: {
        studentId_assignmentId: {
          studentId: student.id,
          assignmentId: req.params.assignmentId,
        },
      },
      update: {
        submissionUrl,
        status: 'SUBMITTED',
        submittedAt: new Date(),
      },
      create: {
        studentId: student.id,
        assignmentId: req.params.assignmentId,
        submissionUrl,
        submittedAt: new Date(),
      },
    });

    res.json(submission);
  } catch (err) {
    console.error('Failed to submit assignment:', err);
    res.status(500).json({ error: 'Failed to submit solution' });
  }
});

// Grade assignment submission (teacher/admin)
router.post('/assignments/submissions/:submissionId/grade', requireAuth, async (req, res) => {
  const { marksObtained, comment } = req.body as { marksObtained?: string; comment?: string };
  if (!marksObtained) {
    return res.status(400).json({ error: 'marksObtained is required' });
  }

  try {
    const teacher = await prisma.teacher.findUnique({ where: { id: req.auth!.userId } });
    if (!teacher) {
      return res.status(403).json({ error: 'Teacher profile required' });
    }

    const marks = parseFloat(marksObtained);
    const feedback = await prisma.assignmentFeedback.upsert({
      where: { submissionId: req.params.submissionId },
      update: {
        marksObtained: marks,
        comment,
        passed: marks >= 40,
      },
      create: {
        submissionId: req.params.submissionId,
        teacherId: teacher.id,
        marksObtained: marks,
        comment,
        passed: marks >= 40,
      }
    });

    await prisma.assignmentSubmission.update({
      where: { id: req.params.submissionId },
      data: { status: 'GRADED' }
    });

    res.json({ success: true, feedback });
  } catch (err) {
    console.error('Failed to grade assignment:', err);
    res.status(500).json({ error: 'Failed to grade submission' });
  }
});

router.get('/students/:studentId/submissions', requireAuth, async (req, res) => {
  try {
    const submissions = await prisma.assignmentSubmission.findMany({
      where: { studentId: req.params.studentId },
      include: { assignment: true },
      orderBy: { submittedAt: 'desc' },
    });
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch student submissions' });
  }
});

export default router;
