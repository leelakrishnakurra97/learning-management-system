import questionBankData from "../data/question-bank.json";

interface Question {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

const QUESTION_BANK = questionBankData as unknown as Record<string, Question[]>;

const FALLBACK_GENERAL: Question[] = [
  {
    question: "What is the primary benefit of studying structured academic courses?",
    options: ["To develop cognitive reasoning and analytical problem solving", "Only to pass standard examinations", "To memorize facts without application", "There is no practical benefit"],
    correctAnswerIndex: 0,
    explanation: "Education seeks to foster logical deduction, critical thinking, and structured analysis skills."
  },
  {
    question: "When approaching complex academic challenges, which strategy is most effective?",
    options: ["Breaking the topic down into structured sub-concepts", "Attempting to memorize whole passages", "Skipping complex items", "Guessing without reading"],
    correctAnswerIndex: 0,
    explanation: "Deconstructing large topics into structured components is a proven educational strategy."
  }
];

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

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

export function generateQuiz(
  subjectTitle: string,
  chapterTitle: string,
  topicTitle: string,
) {
  const categoryKey = getCategoryKey(subjectTitle, chapterTitle, topicTitle);
  let pool = QUESTION_BANK[categoryKey] || [];

  if (pool.length < 10) {
    pool = [...pool];
    for (const q of FALLBACK_GENERAL) {
      if (pool.length >= 10) break;
      pool.push(q);
    }
  }

  // Map each question to match the LMS Quiz interface expectations
  const mappedQuestions = pool.map((q, qIndex) => {
    let difficulty = "Medium";
    if (qIndex % 3 === 0) difficulty = "Easy";
    else if (qIndex % 3 === 2) difficulty = "Hard";

    const originalOptions = [...q.options];
    const correctOption = originalOptions[q.correctAnswerIndex];

    const shuffledOptions = shuffle(originalOptions);
    const newCorrectIndex = shuffledOptions.indexOf(correctOption);

    return {
      id: `q_${categoryKey.substring(0, 5)}_${qIndex}_${Date.now()}`,
      question: q.question,
      options: shuffledOptions,
      correctAnswerIndex: newCorrectIndex,
      explanation: q.explanation,
      difficulty
    };
  });

  return shuffle(mappedQuestions).slice(0, 10);
}


export function generateQuizForChapter(
  classId: string,
  subjectId: string,
  chapterId: string,
  chapterTitle: string,
) {
  // Strip leading numeric prefixes (e.g. "Chapter 1: ") from chapter titles for clean quiz names
  const cleanTitle = chapterTitle.replace(/^(?:Chapter\s+\d+:\s*|\d+[\.\d]*\s*)/i, "");
  const questions = generateQuiz(subjectId, cleanTitle, cleanTitle);
  return {
    id: `quiz_${chapterId}`,
    title: `${cleanTitle} Quiz`,
    subjectId,
    chapterId,
    durationMinutes: 10,
    questions,
  };
}
