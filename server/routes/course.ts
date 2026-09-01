import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/topics/:topicId/videos', async (req, res) => {
  const videos = await prisma.courseVideo.findMany({
    where: { topicId: req.params.topicId },
    orderBy: { sortOrder: 'asc' },
  });
  res.json(videos);
});

router.get('/topics/:topicId/notes', async (req, res) => {
  const notes = await prisma.courseNote.findMany({
    where: { topicId: req.params.topicId },
    orderBy: { sortOrder: 'asc' },
  });
  res.json(notes);
});

router.get('/topics/:topicId/resources', async (req, res) => {
  const resources = await prisma.courseResource.findMany({
    where: { topicId: req.params.topicId },
    orderBy: { sortOrder: 'asc' },
  });
  res.json(resources);
});

router.post('/videos/:videoId/progress', requireAuth, async (req, res) => {
  const { watchDuration, completedPercent } = req.body as {
    watchDuration?: number;
    completedPercent?: number;
  };

  const student = await prisma.student.findUnique({ where: { id: req.auth!.userId } });
  if (!student) {
    return res.status(403).json({ error: 'Student profile required' });
  }

  const progress = await prisma.videoWatchHistory.upsert({
    where: {
      studentId_videoId: {
        studentId: student.id,
        videoId: req.params.videoId,
      },
    },
    update: {
      watchDuration: watchDuration ?? 0,
      completedPercent: completedPercent ?? 0,
    },
    create: {
      studentId: student.id,
      videoId: req.params.videoId,
      watchDuration: watchDuration ?? 0,
      completedPercent: completedPercent ?? 0,
    },
  });

  res.json(progress);
});

export default router;
