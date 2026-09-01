import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { mapQuizForFrontend } from '../lib/mappers.js';
import { requireAuth } from '../middleware/auth.js';
import fs from 'fs';
import path from 'path';

const router = Router();

router.get('/quizzes/:quizId', async (req, res) => {
  const quiz = await prisma.quiz.findUnique({
    where: { id: req.params.quizId },
    include: {
      questions: {
        orderBy: { sortOrder: 'asc' },
        include: {
          options: { orderBy: { sortOrder: 'asc' } },
        },
      },
    },
  });

  if (!quiz) {
    return res.status(404).json({ error: 'Quiz not found' });
  }

  res.json(mapQuizForFrontend(quiz));
});
function getCategoryKey(subjectName: string, chapterName: string, topicName: string): string {
  const cleanSubject = subjectName.toLowerCase();
  const cleanChapter = chapterName.toLowerCase();
  const cleanTopic = topicName.toLowerCase();

  if (cleanSubject.includes("math")) {
    if (
      cleanChapter.includes("set") ||
      cleanChapter.includes("relation") ||
      cleanChapter.includes("function") ||
      cleanTopic.includes("set") ||
      cleanTopic.includes("relation") ||
      cleanTopic.includes("function")
    ) {
      return "math-sets";
    }
    if (
      cleanChapter.includes("complex") ||
      cleanTopic.includes("complex")
    ) {
      return "math-complex";
    }
    if (
      cleanChapter.includes("matrix") ||
      cleanChapter.includes("determinant") ||
      cleanTopic.includes("matrix") ||
      cleanTopic.includes("determinant")
    ) {
      return "math-matrix";
    }
    if (
      cleanChapter.includes("ordinary differential") ||
      cleanTopic.includes("ordinary differential") ||
      cleanChapter.includes("differential equation") ||
      cleanTopic.includes("differential equation")
    ) {
      return "math-equations";
    }
    if (
      cleanChapter.includes("equation") ||
      cleanTopic.includes("equation") ||
      cleanChapter.includes("algebra") ||
      cleanTopic.includes("algebra")
    ) {
      if (cleanChapter.includes("basic") || cleanTopic.includes("real")) {
        return "math-numbers";
      }
      return "math-algebra";
    }
    if (
      cleanChapter.includes("geometry") ||
      cleanChapter.includes("vector") ||
      cleanChapter.includes("locus") ||
      cleanChapter.includes("conic") ||
      cleanChapter.includes("line") ||
      cleanTopic.includes("geometry") ||
      cleanTopic.includes("vector") ||
      cleanTopic.includes("locus") ||
      cleanTopic.includes("conic") ||
      cleanTopic.includes("line")
    ) {
      return "math-geometry";
    }
    if (
      cleanChapter.includes("trig") ||
      cleanTopic.includes("trig")
    ) {
      return "math-trig";
    }
    if (
      cleanChapter.includes("calculus") ||
      cleanChapter.includes("limit") ||
      cleanChapter.includes("diff") ||
      cleanTopic.includes("calculus") ||
      cleanTopic.includes("limit") ||
      cleanTopic.includes("diff")
    ) {
      return "math-calculus";
    }
    if (
      cleanChapter.includes("combinat") ||
      cleanChapter.includes("induction") ||
      cleanChapter.includes("count") ||
      cleanTopic.includes("combinat") ||
      cleanTopic.includes("induction") ||
      cleanTopic.includes("count")
    ) {
      return "math-combinatorics";
    }
    if (
      cleanChapter.includes("stat") ||
      cleanChapter.includes("prob") ||
      cleanChapter.includes("mensur") ||
      cleanTopic.includes("stat") ||
      cleanTopic.includes("prob") ||
      cleanTopic.includes("mensur")
    ) {
      return "math-stats";
    }
    return "math-numbers";
  }

  const isPhysics = cleanSubject.includes("physics") || cleanChapter.includes("physics") || cleanTopic.includes("physics") || cleanChapter.includes("phys") || cleanTopic.includes("phys");
  const isChemistry = cleanSubject.includes("chemistry") || cleanSubject.includes("chem") || cleanChapter.includes("chemistry") || cleanTopic.includes("chemistry") || cleanChapter.includes("chem") || cleanTopic.includes("chem");
  const isBiology = cleanSubject.includes("biology") || cleanSubject.includes("bio") || cleanChapter.includes("biology") || cleanTopic.includes("biology") || cleanChapter.includes("bio") || cleanTopic.includes("bio");

  if (isPhysics || cleanChapter.includes("electro") || cleanChapter.includes("electri") || cleanChapter.includes("magnet") || cleanChapter.includes("induction") || cleanTopic.includes("electro") || cleanTopic.includes("electri") || cleanTopic.includes("magnet") || cleanTopic.includes("induction")) {
    if (cleanChapter.includes("electro") || cleanChapter.includes("electri") || cleanChapter.includes("magnet") || cleanTopic.includes("electro") || cleanTopic.includes("electri") || cleanTopic.includes("magnet")) {
      return "science-physics-electro";
    }
    if (cleanChapter.includes("optic") || cleanChapter.includes("acoust") || cleanChapter.includes("sound") || cleanChapter.includes("wave") || cleanTopic.includes("optic") || cleanTopic.includes("acoust") || cleanTopic.includes("sound") || cleanTopic.includes("wave")) {
      return "science-physics-optics";
    }
    return "science-physics-motion";
  }

  if (isChemistry || cleanChapter.includes("metall") || cleanTopic.includes("metall")) {
    if (cleanChapter.includes("metall") || cleanTopic.includes("metall")) {
      return "science-chemistry-metallurgy";
    }
    if (cleanChapter.includes("organic") || cleanChapter.includes("carbon") || cleanChapter.includes("biomolec") || cleanTopic.includes("organic") || cleanTopic.includes("carbon") || cleanTopic.includes("biomolec")) {
      return "science-chemistry-organic";
    }
    if (cleanChapter.includes("reaction") || cleanChapter.includes("acid") || cleanChapter.includes("base") || cleanChapter.includes("salt") || cleanChapter.includes("equilibrium") || cleanChapter.includes("electrochem") || cleanTopic.includes("reaction") || cleanTopic.includes("acid") || cleanTopic.includes("base") || cleanTopic.includes("salt") || cleanTopic.includes("equilibrium") || cleanTopic.includes("electrochem")) {
      return "science-chemistry-physical";
    }
    return "science-chemistry-bonding";
  }

  if (isBiology) {
    if (cleanChapter.includes("cell") || cleanChapter.includes("tissu") || cleanChapter.includes("morphol") || cleanTopic.includes("cell") || cleanTopic.includes("tissu") || cleanTopic.includes("morphol")) {
      return "science-biology-cell";
    }
    if (cleanChapter.includes("health") || cleanChapter.includes("ill") || cleanChapter.includes("disease") || cleanTopic.includes("health") || cleanTopic.includes("ill") || cleanTopic.includes("disease")) {
      return "science-biology-health";
    }
    if (cleanChapter.includes("ecolog") || cleanChapter.includes("environ") || cleanChapter.includes("resource") || cleanChapter.includes("divers") || cleanTopic.includes("ecolog") || cleanTopic.includes("environ") || cleanTopic.includes("resource") || cleanTopic.includes("divers")) {
      return "science-biology-ecology";
    }
    return "science-biology-genetics";
  }

  return "science-physics-motion";
}

function getQuestionsForTopic(subjectName: string, chapterName: string, topicName: string, topicId?: string) {
  try {
    const questionsPath = path.join(process.cwd(), 'server', 'data', 'question-bank.json');
    if (fs.existsSync(questionsPath)) {
      const fileContent = fs.readFileSync(questionsPath, 'utf-8');
      const db = JSON.parse(fileContent);
      const catKey = getCategoryKey(subjectName, chapterName, topicName);
      if (db[catKey] && Array.isArray(db[catKey]) && db[catKey].length === 10) {
        return db[catKey];
      }
    }
  } catch (err) {
    console.error('Failed to load questions from question-bank.json:', err);
  }

  // Fallback to legacy hardcoded matrices list if file reading fails
  return [
    {
      question: "What is the determinant of a 2x2 identity matrix?",
      options: ["1", "0", "-1", "2"],
      correctAnswerIndex: 0,
    },
    {
      question: "If det(A) = 0, the matrix A is defined as:",
      options: ["Singular", "Non-singular", "Invertible", "Symmetric"],
      correctAnswerIndex: 0,
    },
    {
      question: "For a square matrix A, which operation yields the identity matrix?",
      options: ["A * A⁻¹", "A + A", "A - A", "A * A"],
      correctAnswerIndex: 0,
    },
    {
      question: "What is the transpose of a symmetric matrix A?",
      options: ["A", "-A", "A⁻¹", "Aᵀ"],
      correctAnswerIndex: 0,
    },
    {
      question: "For any square matrix A, which of the following is always a symmetric matrix?",
      options: ["A + Aᵀ", "A - Aᵀ", "Aᵀ", "A²"],
      correctAnswerIndex: 0,
    },
    {
      question: "If A is a square matrix of order n, then det(kA) is equal to:",
      options: ["kⁿ det(A)", "k det(A)", "kⁿ⁺¹ det(A)", "nᵏ det(A)"],
      correctAnswerIndex: 0,
    },
    {
      question: "If the determinant of a matrix A is equal to zero, then its inverse matrix:",
      options: ["Does not exist", "Is equal to A", "Is the identity matrix", "Is equal to zero"],
      correctAnswerIndex: 0,
    },
    {
      question: "If a matrix has 12 elements, how many possible orders can it have?",
      options: ["6", "12", "4", "3"],
      correctAnswerIndex: 0,
    },
    {
      question: "A matrix in which all elements above or below the main diagonal are zero is called:",
      options: ["Diagonal matrix", "Row matrix", "Column matrix", "Scalar matrix"],
      correctAnswerIndex: 0,
    },
    {
      question: "If A and B are square matrices of the same order, then (AB)⁻¹ is equal to:",
      options: ["B⁻¹A⁻¹", "A⁻¹B⁻¹", "AB", "BA"],
      correctAnswerIndex: 0,
    }
  ];
}

router.get('/topics/:topicId/quizzes', async (req, res) => {
  const topicId = req.params.topicId;
  let quizzes = await prisma.quiz.findMany({
    where: { topicId },
    include: {
      questions: {
        orderBy: { sortOrder: 'asc' },
        include: {
          options: { orderBy: { sortOrder: 'asc' } },
        },
      },
    },
  });

  if (quizzes.length === 0) {
    try {
      const topic = await prisma.topic.findUnique({
        where: { id: topicId },
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
      });

      if (topic) {
        const questionsToCreate = getQuestionsForTopic(
          topic.chapter.unit.subject.name,
          topic.chapter.name,
          topic.name,
          topic.id
        );

        const newQuiz = await prisma.quiz.create({
          data: {
            title: `${topic.name} Assessment`,
            description: `Assessment questions for topic: ${topic.name}`,
            topicId: topic.id,
            passingScore: 40.0,
            timeLimitMinutes: 10,
          }
        });

        for (let i = 0; i < questionsToCreate.length; i++) {
          const q = questionsToCreate[i];
          const question = await prisma.quizQuestion.create({
            data: {
              quizId: newQuiz.id,
              questionText: q.question,
              questionType: 'MCQ',
              marks: 1.0,
              sortOrder: i,
            }
          });

          await prisma.quizOption.createMany({
            data: q.options.map((opt: string, idx: number) => ({
              questionId: question.id,
              optionText: opt,
              isCorrect: idx === q.correctAnswerIndex,
              sortOrder: idx,
            }))
          });
        }

        const createdQuiz = await prisma.quiz.findUnique({
          where: { id: newQuiz.id },
          include: {
            questions: {
              orderBy: { sortOrder: 'asc' },
              include: {
                options: { orderBy: { sortOrder: 'asc' } },
              },
            },
          },
        });

        if (createdQuiz) {
          quizzes = [createdQuiz];
        }
      }
    } catch (err) {
      console.error('Failed to auto-seed quiz in database:', err);
    }
  }

  res.json(quizzes.map(mapQuizForFrontend));
});

router.post('/quizzes/:quizId/attempt', requireAuth, async (req, res) => {
  const student = await prisma.student.findUnique({ where: { id: req.auth!.userId } });
  if (!student) {
    return res.status(403).json({ error: 'Student profile required' });
  }

  const responses = (req.body.responses ?? []) as Array<{
    questionId: string;
    selectedOptionId?: string;
  }>;

  const quiz = await prisma.quiz.findUnique({
    where: { id: req.params.quizId },
    include: {
      questions: {
        include: { options: true },
      },
    },
  });

  if (!quiz) {
    return res.status(404).json({ error: 'Quiz not found' });
  }

  const previousAttempts = await prisma.quizAttempt.count({
    where: { studentId: student.id, quizId: quiz.id },
  });

  let score = 0;
  const totalMarks = quiz.questions.reduce((sum, question) => sum + question.marks, 0);

  const attempt = await prisma.quizAttempt.create({
    data: {
      studentId: student.id,
      quizId: quiz.id,
      attemptNumber: previousAttempts + 1,
      completedAt: new Date(),
    },
  });

  for (const response of responses) {
    const question = quiz.questions.find((item) => item.id === response.questionId);
    if (!question) continue;

    const selectedOption = question.options.find((option) => option.id === response.selectedOptionId);
    const isCorrect = Boolean(selectedOption?.isCorrect);
    if (isCorrect) score += question.marks;

    await prisma.quizQuestionResponse.create({
      data: {
        attemptId: attempt.id,
        questionId: question.id,
        selectedOptionId: response.selectedOptionId,
        isCorrect,
        marksAwarded: isCorrect ? question.marks : 0,
      },
    });
  }

  const percentage = totalMarks > 0 ? (score / totalMarks) * 100 : 0;
  const passed = percentage >= quiz.passingScore;

  await prisma.quizAttempt.update({
    where: { id: attempt.id },
    data: { score, passed },
  });

  const result = await prisma.quizResult.create({
    data: {
      attemptId: attempt.id,
      studentId: student.id,
      quizId: quiz.id,
      score,
      percentage,
      passed,
    },
  });

  res.json({
    quizId: quiz.id,
    title: quiz.title,
    score,
    totalQuestions: quiz.questions.length,
    percentage,
    passed,
    resultId: result.id,
  });
});

router.get('/students/:studentId/quiz-results', requireAuth, async (req, res) => {
  const results = await prisma.quizResult.findMany({
    where: { studentId: req.params.studentId },
    include: { quiz: true },
    orderBy: { createdAt: 'desc' },
  });

  res.json(
    results.map((result) => ({
      quizId: result.quizId,
      title: result.quiz.title,
      score: result.score,
      totalQuestions: 0,
      timeTakenSeconds: 0,
      date: result.createdAt.toISOString(),
      incorrectAnswersDetails: [],
    }))
  );
});

export default router;
