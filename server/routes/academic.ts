import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { mapBoard, mapClassLevel, mapSubject, mapChapter, mapTopic } from '../lib/mappers.js';
import { optionalAuth } from '../middleware/auth.js';

const router = Router();

const topicInclude = (studentId?: string) => ({
  orderBy: { sortOrder: 'asc' as const },
  include: {
    studentProgress: studentId
      ? { where: { studentId }, take: 1 }
      : false,
    notes: { orderBy: { sortOrder: 'asc' as const } },
    videos: { orderBy: { sortOrder: 'asc' as const } },
  },
});

const chapterInclude = (studentId?: string) => ({
  orderBy: { sortOrder: 'asc' as const },
  include: {
    topics: topicInclude(studentId),
  },
});

const unitInclude = (studentId?: string) => ({
  orderBy: { sortOrder: 'asc' as const },
  include: {
    chapters: chapterInclude(studentId),
  },
});

const subjectInclude = (studentId?: string) => ({
  orderBy: { sortOrder: 'asc' as const },
  include: {
    units: unitInclude(studentId),
  },
});

const classInclude = (studentId?: string) => ({
  orderBy: { sortOrder: 'asc' as const },
  include: {
    subjects: subjectInclude(studentId),
  },
});

router.get('/academic/structure', optionalAuth, async (req, res) => {
  const studentId = req.auth?.role === 'STUDENT' ? req.auth.userId : undefined;

  const boards = await prisma.board.findMany({
    orderBy: { name: 'asc' },
    include: {
      classes: classInclude(studentId),
    },
  });

  res.json(boards.map(mapBoard));
});

router.get('/boards', async (_req, res) => {
  const boards = await prisma.board.findMany({ orderBy: { name: 'asc' } });
  res.json(boards.map((board) => ({ id: board.id, title: board.name, code: board.code })));
});

router.get('/boards/:boardId/classes', async (req, res) => {
  const classes = await prisma.class.findMany({
    where: { boardId: req.params.boardId },
    orderBy: { sortOrder: 'asc' },
  });
  res.json(classes.map((item) => ({ id: item.id, title: item.name })));
});

router.get('/classes/:classId/subjects', async (req, res) => {
  const subjects = await prisma.subject.findMany({
    where: { classId: req.params.classId },
    orderBy: { sortOrder: 'asc' },
    include: { units: unitInclude() },
  });
  res.json(subjects.map((subject, index) => mapSubject(subject, index)));
});

router.get('/subjects/:subjectId/units', async (req, res) => {
  const units = await prisma.unit.findMany({
    where: { subjectId: req.params.subjectId },
    orderBy: { sortOrder: 'asc' },
    include: { chapters: chapterInclude() },
  });

  const chapters = units.flatMap((unit) =>
    unit.chapters.map((chapter) => ({
      ...mapChapter(chapter),
      title: (unit.name !== 'Core Syllabus') ? `${unit.name}: ${chapter.name}` : chapter.name,
    }))
  );

  res.json(chapters);
});

router.get('/chapters/:chapterId/topics', async (req, res) => {
  const topics = await prisma.topic.findMany({
    where: { chapterId: req.params.chapterId },
    orderBy: { sortOrder: 'asc' },
  });
  res.json(topics.map(mapTopic));
});

router.get('/classes/:classId/structure', async (req, res) => {
  const classLevel = await prisma.class.findUnique({
    where: { id: req.params.classId },
    include: { subjects: subjectInclude() },
  });

  if (!classLevel) {
    return res.status(404).json({ error: 'Class not found' });
  }

  res.json(mapClassLevel(classLevel));
});

export default router;
