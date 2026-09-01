import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/students/:studentId/progress/topics/:topicId', requireAuth, async (req, res) => {
  const progress = await prisma.studentTopicProgress.findUnique({
    where: {
      studentId_topicId: {
        studentId: req.params.studentId,
        topicId: req.params.topicId,
      },
    },
  });

  res.json(progress ?? { isCompleted: false, watchPercent: 0, unlocked: false });
});

router.get('/students/:studentId/progress/subjects/:subjectId', requireAuth, async (req, res) => {
  const progress = await prisma.studentSubjectProgress.findUnique({
    where: {
      studentId_subjectId: {
        studentId: req.params.studentId,
        subjectId: req.params.subjectId,
      },
    },
  });

  res.json(progress ?? { completedPercentage: 0, isCompleted: false, unlocked: false });
});

router.get('/students/:studentId/analytics', requireAuth, async (req, res) => {
  const analytics = await prisma.studentAnalytics.findUnique({
    where: { studentId: req.params.studentId },
  });

  res.json(
    analytics ?? {
      totalStudyTimeMinutes: 0,
      averageQuizScore: 0,
      overallCompletionRate: 0,
      xp: 0,
    }
  );
});

export default router;
