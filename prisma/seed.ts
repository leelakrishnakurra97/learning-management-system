import { PrismaClient, UserRole, QuestionType, LiveClassStatus, AttendanceStatus, NotificationType, BillingPeriod, SubscriptionStatus, PaymentStatus, PaymentGateway, SubmissionStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { initialBoards } from './tnsb-data';

const prisma = new PrismaClient();
const DEFAULT_PASSWORD = 'password123';

async function main() {
  console.log('Starting seed...');
  const passwordHash = await bcrypt.hash(DEFAULT_PASSWORD, 10);

  console.log('Cleaning up existing database records...');
  await prisma.subjectStatistics.deleteMany({});
  await prisma.learningStreak.deleteMany({});
  await prisma.studentAnalytics.deleteMany({});
  await prisma.studentTopicProgress.deleteMany({});
  await prisma.studentChapterProgress.deleteMany({});
  await prisma.studentSubjectProgress.deleteMany({});
  await prisma.assignment.deleteMany({});
  await prisma.quizOption.deleteMany({});
  await prisma.quizQuestion.deleteMany({});
  await prisma.quiz.deleteMany({});
  await prisma.courseNote.deleteMany({});
  await prisma.courseVideo.deleteMany({});
  await prisma.course.deleteMany({});
  await prisma.payment.deleteMany({});
  await prisma.subscription.deleteMany({});
  await prisma.subscriptionPlan.deleteMany({});
  await prisma.userRoleJoin.deleteMany({});
  await prisma.student.deleteMany({});
  await prisma.teacher.deleteMany({});
  await prisma.admin.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.topic.deleteMany({});
  await prisma.chapter.deleteMany({});
  await prisma.unit.deleteMany({});
  await prisma.subject.deleteMany({});
  await prisma.class.deleteMany({});
  await prisma.board.deleteMany({});


  // ==========================================
  // 1. SEED PERMISSIONS
  // ==========================================
  console.log('Seeding permissions...');
  const permissionsList = [
    { name: 'academic:read', description: 'Can read academic structure' },
    { name: 'academic:write', description: 'Can edit academic structure' },
    { name: 'course:read', description: 'Can read course materials' },
    { name: 'course:write', description: 'Can write course materials' },
    { name: 'video:watch', description: 'Can watch DRM protected videos' },
    { name: 'quiz:attempt', description: 'Can attempt quizzes' },
    { name: 'quiz:grade', description: 'Can grade quizzes' },
    { name: 'assignment:submit', description: 'Can submit assignments' },
    { name: 'assignment:grade', description: 'Can grade and give feedback on assignments' },
    { name: 'live-class:join', description: 'Can join live sessions' },
    { name: 'live-class:host', description: 'Can host live classes' },
    { name: 'billing:manage', description: 'Can manage billing and subscriptions' },
    { name: 'analytics:read', description: 'Can read learning and platform analytics' },
  ];

  const dbPermissions: Record<string, any> = {};
  for (const perm of permissionsList) {
    dbPermissions[perm.name] = await prisma.permission.upsert({
      where: { name: perm.name },
      update: {},
      create: perm,
    });
  }

  // ==========================================
  // 2. SEED ROLES
  // ==========================================
  console.log('Seeding roles...');
  const adminRole = await prisma.role.upsert({
    where: { name: 'ADMIN' },
    update: {},
    create: { name: 'ADMIN', description: 'Full system administrator access' },
  });

  const teacherRole = await prisma.role.upsert({
    where: { name: 'TEACHER' },
    update: {},
    create: { name: 'TEACHER', description: 'Access to manage courses, grade assessments, and host live classes' },
  });

  const studentRole = await prisma.role.upsert({
    where: { name: 'STUDENT' },
    update: {},
    create: { name: 'STUDENT', description: 'Access to courses, materials, quizzes, and live classrooms' },
  });

  // ==========================================
  // 3. MAP ROLE TO PERMISSIONS
  // ==========================================
  console.log('Mapping permissions to roles...');
  for (const permKey in dbPermissions) {
    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: adminRole.id,
          permissionId: dbPermissions[permKey].id,
        },
      },
      update: {},
      create: {
        roleId: adminRole.id,
        permissionId: dbPermissions[permKey].id,
      },
    });
  }

  const teacherPerms = [
    'academic:read',
    'course:write',
    'video:watch',
    'quiz:grade',
    'assignment:grade',
    'live-class:host',
    'analytics:read',
  ];
  for (const name of teacherPerms) {
    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: teacherRole.id,
          permissionId: dbPermissions[name].id,
        },
      },
      update: {},
      create: {
        roleId: teacherRole.id,
        permissionId: dbPermissions[name].id,
      },
    });
  }

  const studentPerms = [
    'academic:read',
    'course:read',
    'video:watch',
    'quiz:attempt',
    'assignment:submit',
    'live-class:join',
    'analytics:read',
  ];
  for (const name of studentPerms) {
    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: studentRole.id,
          permissionId: dbPermissions[name].id,
        },
      },
      update: {},
      create: {
        roleId: studentRole.id,
        permissionId: dbPermissions[name].id,
      },
    });
  }

  // ==========================================
  // 4. DYNAMIC ACADEMIC HIERARCHY (TNSB ONLY)
  // ==========================================
  console.log('Seeding TNSB Academic Hierarchy...');

  let boardTNSB: any;
  let class12: any;
  let class9: any;
  let maths: any;
  let physics: any;
  let chemistry: any;
  let chemistry9: any; // We map this to class 9 science subject

  let topicMath1: any;
  let topicMath2: any;
  let topicPhys1: any;
  let topicPhys2: any;
  let topicChem1: any;
  let topicChem2: any;
  let topicMatter1: any;
  let topicMatter2: any;

  for (const boardData of initialBoards) {
    const dbBoard = await prisma.board.upsert({
      where: { code: boardData.id.toUpperCase() },
      update: {},
      create: { name: boardData.title, code: boardData.id.toUpperCase() },
    });

    if (boardData.id === 'tnsb') {
      boardTNSB = dbBoard;
    }

    for (let cIndex = 0; cIndex < boardData.classes.length; cIndex++) {
      const classData = boardData.classes[cIndex];
      const sortOrder = classData.id === 'class-12' ? 12 : classData.id === 'class-11' ? 11 : classData.id === 'class-10' ? 10 : 9;
      const dbClass = await prisma.class.upsert({
        where: { boardId_name: { boardId: dbBoard.id, name: classData.title } },
        update: {},
        create: { name: classData.title, sortOrder, boardId: dbBoard.id },
      });

      if (boardData.id === 'tnsb') {
        if (classData.id === 'class-12') class12 = dbClass;
        if (classData.id === 'class-9') class9 = dbClass;
      }

      for (let sIndex = 0; sIndex < classData.subjects.length; sIndex++) {
        const subjectData = classData.subjects[sIndex];
        const dbSubject = await prisma.subject.upsert({
          where: { classId_name: { classId: dbClass.id, name: subjectData.title } },
          update: {},
          create: {
            name: subjectData.title,
            code: subjectData.id.toUpperCase(),
            sortOrder: sIndex + 1,
            classId: dbClass.id
          }
        });

        if (boardData.id === 'tnsb') {
          if (classData.id === 'class-12') {
            if (subjectData.id === 'maths-12-v1') maths = dbSubject;
            if (subjectData.id === 'physics-12-v1') physics = dbSubject;
            if (subjectData.id === 'chemistry-12-v1') chemistry = dbSubject;
          }
          if (classData.id === 'class-9') {
            if (subjectData.id === 'science-9') chemistry9 = dbSubject;
          }
        }

        // Create a default unit:
        const dbUnit = await prisma.unit.upsert({
          where: { subjectId_name: { subjectId: dbSubject.id, name: 'Core Syllabus' } },
          update: {},
          create: {
            name: 'Core Syllabus',
            sortOrder: 1,
            subjectId: dbSubject.id
          }
        });

        for (let chapIndex = 0; chapIndex < subjectData.chapters.length; chapIndex++) {
          const chapterData = subjectData.chapters[chapIndex];
          const dbChapter = await prisma.chapter.upsert({
            where: { unitId_name: { unitId: dbUnit.id, name: chapterData.title } },
            update: {},
            create: {
              name: chapterData.title,
              sortOrder: chapIndex + 1,
              unitId: dbUnit.id
            }
          });

          for (let topIndex = 0; topIndex < chapterData.topics.length; topIndex++) {
            const topicData = chapterData.topics[topIndex];
            const dbTopic = await prisma.topic.upsert({
              where: { chapterId_name: { chapterId: dbChapter.id, name: topicData.title } },
              update: {},
              create: {
                name: topicData.title,
                sortOrder: topIndex + 1,
                chapterId: dbChapter.id,
                requireWatchPercent: 90.0,
                requireQuizPass: true
              }
            });

            // Map standard topic variables for later courses/materials seeding
            if (boardData.id === 'tnsb') {
              if (classData.id === 'class-12') {
                if (subjectData.id === 'maths-12-v1') {
                  if (topicData.title.includes('Adjoint')) topicMath1 = dbTopic;
                  if (topicData.title.includes('Rank')) topicMath2 = dbTopic;
                }
                if (subjectData.id === 'physics-12-v1') {
                  if (topicData.title.includes('Coulomb')) topicPhys1 = dbTopic;
                  if (topicData.title.includes('Electric Field')) topicPhys2 = dbTopic;
                }
                if (subjectData.id === 'chemistry-12-v1') {
                  if (topicData.title.includes('Concentration')) topicChem1 = dbTopic;
                  if (topicData.title.includes('Extraction')) topicChem2 = dbTopic;
                }
              }
              if (classData.id === 'class-9') {
                if (subjectData.id === 'science-9') {
                  if (topicData.title.includes('Matter')) topicMatter1 = dbTopic;
                  if (topicData.title.includes('Atomic')) topicMatter2 = dbTopic;
                }
              }
            }
          }
        }
      }
    }
  }

  // Fallbacks in case titles mismatched slightly:
  if (!topicMath1) topicMath1 = await prisma.topic.findFirst({ where: { chapter: { unit: { subjectId: maths.id } } } });
  if (!topicMath2) topicMath2 = await prisma.topic.findFirst({ where: { chapter: { unit: { subjectId: maths.id } }, NOT: { id: topicMath1?.id } } });
  if (!topicPhys1) topicPhys1 = await prisma.topic.findFirst({ where: { chapter: { unit: { subjectId: physics.id } } } });
  if (!topicPhys2) topicPhys2 = await prisma.topic.findFirst({ where: { chapter: { unit: { subjectId: physics.id } }, NOT: { id: topicPhys1?.id } } });
  if (!topicChem1) topicChem1 = await prisma.topic.findFirst({ where: { chapter: { unit: { subjectId: chemistry.id } } } });
  if (!topicChem2) topicChem2 = await prisma.topic.findFirst({ where: { chapter: { unit: { subjectId: chemistry.id } }, NOT: { id: topicChem1?.id } } });
  if (!topicMatter1) topicMatter1 = await prisma.topic.findFirst({ where: { name: { contains: 'Matter' }, chapter: { unit: { subjectId: chemistry9.id } } } });
  if (!topicMatter2) topicMatter2 = await prisma.topic.findFirst({ where: { name: { contains: 'Atomic' }, chapter: { unit: { subjectId: chemistry9.id } } } });

  const chapterMatrices = await prisma.chapter.findFirst({ where: { name: { contains: 'Matrices' }, unit: { subjectId: maths.id } } });
  const chapterElectrostatics = await prisma.chapter.findFirst({ where: { name: { contains: 'Electrostatics' }, unit: { subjectId: physics.id } } });
  const chapterMetallurgy = await prisma.chapter.findFirst({ where: { name: { contains: 'Metallurgy' }, unit: { subjectId: chemistry.id } } });



  // ==========================================
  // 5. SEED USERS & ROLES
  // ==========================================
  console.log('Seeding Users...');

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@nexoralearning.com' },
    update: { passwordHash },
    create: {
      email: 'admin@nexoralearning.com',
      passwordHash,
      firstName: 'Aarav',
      lastName: 'Sharma',
      role: UserRole.ADMIN,
      phoneNumber: '9876543210',
    },
  });

  await prisma.admin.upsert({
    where: { id: adminUser.id },
    update: {},
    create: { id: adminUser.id, dept: 'Operations & Curriculum' },
  });

  await prisma.userRoleJoin.upsert({
    where: { userId_roleId: { userId: adminUser.id, roleId: adminRole.id } },
    update: {},
    create: { userId: adminUser.id, roleId: adminRole.id },
  });

  // Teacher
  const teacherUser = await prisma.user.upsert({
    where: { email: 'teacher@nexoralearning.com' },
    update: { passwordHash },
    create: {
      email: 'teacher@nexoralearning.com',
      passwordHash,
      firstName: 'Dr. Ramesh',
      lastName: 'Prasad',
      role: UserRole.TEACHER,
      phoneNumber: '9876543211',
    },
  });

  const dbTeacher = await prisma.teacher.upsert({
    where: { id: teacherUser.id },
    update: {},
    create: {
      id: teacherUser.id,
      bio: 'PhD in Physics from IIT Madras with 15+ years of class 9-12 teaching experience.',
      qualification: 'PhD in Physics',
    },
  });

  await prisma.userRoleJoin.upsert({
    where: { userId_roleId: { userId: teacherUser.id, roleId: teacherRole.id } },
    update: {},
    create: { userId: teacherUser.id, roleId: teacherRole.id },
  });

  // Student
  const studentUser = await prisma.user.upsert({
    where: { email: 'student@nexoralearning.com' },
    update: { passwordHash },
    create: {
      email: 'student@nexoralearning.com',
      passwordHash,
      firstName: 'Prathamesh',
      lastName: 'Sharma',
      role: UserRole.STUDENT,
      phoneNumber: '9876543212',
    },
  });

  const dbStudent = await prisma.student.upsert({
    where: { id: studentUser.id },
    update: {},
    create: {
      id: studentUser.id,
      classId: class12.id,
      boardId: boardTNSB.id,
    },
  });

  await prisma.userRoleJoin.upsert({
    where: { userId_roleId: { userId: studentUser.id, roleId: studentRole.id } },
    update: {},
    create: { userId: studentUser.id, roleId: studentRole.id },
  });

  // ==========================================
  // 6. SEED SUBSCRIPTIONS
  // ==========================================
  console.log('Seeding Subscription Plans...');
  const premiumPlan = await prisma.subscriptionPlan.upsert({
    where: { name: 'EduVerse Premium Monthly' },
    update: {},
    create: {
      name: 'EduVerse Premium Monthly',
      description: 'Full access to high-end live classes, premium analytics, personalized feedback, and complete syllabus.',
      price: 30000.00,
      durationDays: 30,
      billingPeriod: BillingPeriod.MONTHLY,
      isActive: true,
    },
  });

  const startDate = new Date();
  const endDate = new Date();
  endDate.setDate(startDate.getDate() + 30);

  const studentSub = await prisma.subscription.create({
    data: {
      studentId: dbStudent.id,
      planId: premiumPlan.id,
      status: SubscriptionStatus.ACTIVE,
      startDate: startDate,
      endDate: endDate,
      nextBillingDate: endDate,
    },
  });

  await prisma.payment.create({
    data: {
      subscriptionId: studentSub.id,
      amount: 30000.00,
      currency: 'INR',
      status: PaymentStatus.SUCCESS,
      gateway: PaymentGateway.RAZORPAY,
      transactionId: 'pay_HjK982Kls9PzL2',
      paidAt: startDate,
    },
  });

  // ==========================================
  // 7. SEED COURSES & CONTENT
  // ==========================================
  console.log('Seeding Courses and Materials...');

  // Maths Course
  const courseMaths = await prisma.course.create({
    data: {
      title: 'TNSB Class 12 Mathematics Masterclass',
      description: 'Comprehensive guide for Class 12 Tamil Nadu State Board Mathematics.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=300',
      subjectId: maths.id,
      classId: class12.id,
      boardId: boardTNSB.id,
      teacherId: dbTeacher.id,
    },
  });

  // Physics Course
  const coursePhysics = await prisma.course.create({
    data: {
      title: 'TNSB Class 12 Physics Masterclass',
      description: 'Comprehensive guide for Class 12 Tamil Nadu State Board Physics.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=800&q=80',
      subjectId: physics.id,
      classId: class12.id,
      boardId: boardTNSB.id,
      teacherId: dbTeacher.id,
    },
  });

  // Chemistry Course
  const courseChemistry = await prisma.course.create({
    data: {
      title: 'TNSB Class 12 Chemistry Masterclass',
      description: 'Comprehensive guide for Class 12 Tamil Nadu State Board Chemistry.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&q=80&w=300',
      subjectId: chemistry.id,
      classId: class12.id,
      boardId: boardTNSB.id,
      teacherId: dbTeacher.id,
    },
  });


  // Videos
  await prisma.courseVideo.create({
    data: {
      title: 'Intro to Matrices and Determinants',
      videoUrl: 'https://www.w3schools.com/html/movie.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=300',
      duration: 930, // 15m 30s
      topicId: topicMath1.id,
      sortOrder: 1,
    },
  });

  await prisma.courseVideo.create({
    data: {
      title: 'Coulomb\'s Law Basics',
      videoUrl: 'https://www.w3schools.com/html/movie.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&q=80&w=300',
      duration: 900,
      topicId: topicPhys1.id,
      sortOrder: 1,
    },
  });

  await prisma.courseVideo.create({
    data: {
      title: 'Alloys and Metal Properties',
      videoUrl: 'https://www.w3schools.com/html/movie.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&q=80&w=300',
      duration: 1440,
      topicId: topicChem1.id,
      sortOrder: 1,
    },
  });

  // Notes
  await prisma.courseNote.create({
    data: {
      title: 'Adjoint & Inverse Formulas Sheet',
      fileUrl: '/adjoint_inverse_rank_notes.pdf',
      topicId: topicMath1.id,
      sortOrder: 1,
      isRequiredForComplete: true,
    },
  });

  // Quizzes
  const quizMath = await prisma.quiz.create({
    data: {
      title: 'Matrices Basics Assessment',
      description: 'Test your understanding of matrices and determinants properties.',
      topicId: topicMath1.id,
      passingScore: 80.0,
      maxAttempts: 3,
      timeLimitMinutes: 10,
    },
  });

  const matricesQuestions = [
    {
      questionText: 'If A is a square matrix of order 3 and |A| = 5, what is the value of |adj A|?',
      options: [
        { optionText: '5', isCorrect: false },
        { optionText: '25', isCorrect: true },
        { optionText: '125', isCorrect: false },
        { optionText: '1', isCorrect: false },
      ],
    },
    {
      questionText: 'Which method is used for solving a system of linear equations using determinants?',
      options: [
        { optionText: 'Gaussian Elimination', isCorrect: false },
        { optionText: 'Cramer\'s Rule', isCorrect: true },
        { optionText: 'Matrix Inversion', isCorrect: false },
        { optionText: 'Euler\'s Method', isCorrect: false },
      ],
    },
    {
      questionText: 'What is the determinant of a 2x2 identity matrix?',
      options: [
        { optionText: '1', isCorrect: true },
        { optionText: '0', isCorrect: false },
        { optionText: '-1', isCorrect: false },
        { optionText: '2', isCorrect: false },
      ],
    },
    {
      questionText: 'If det(A) = 0, the matrix A is defined as:',
      options: [
        { optionText: 'Singular', isCorrect: true },
        { optionText: 'Non-singular', isCorrect: false },
        { optionText: 'Invertible', isCorrect: false },
        { optionText: 'Symmetric', isCorrect: false },
      ],
    },
    {
      questionText: 'For a square matrix A, which operation yields the identity matrix?',
      options: [
        { optionText: 'A * A⁻¹', isCorrect: true },
        { optionText: 'A + A', isCorrect: false },
        { optionText: 'A - A', isCorrect: false },
        { optionText: 'A * A', isCorrect: false },
      ],
    },
    {
      questionText: 'What is the transpose of a symmetric matrix A?',
      options: [
        { optionText: 'A', isCorrect: true },
        { optionText: '-A', isCorrect: false },
        { optionText: 'A⁻¹', isCorrect: false },
        { optionText: 'Aᵀ', isCorrect: false },
      ],
    },
    {
      questionText: 'For any square matrix A, which of the following is always a symmetric matrix?',
      options: [
        { optionText: 'A + Aᵀ', isCorrect: true },
        { optionText: 'A - Aᵀ', isCorrect: false },
        { optionText: 'A * Aᵀ', isCorrect: false },
        { optionText: 'Aᵀ', isCorrect: false },
      ],
    },
    {
      questionText: 'If a matrix has 12 elements, how many possible orders can it have?',
      options: [
        { optionText: '6', isCorrect: true },
        { optionText: '12', isCorrect: false },
        { optionText: '4', isCorrect: false },
        { optionText: '3', isCorrect: false },
      ],
    },
    {
      questionText: 'A matrix in which all elements above or below the main diagonal are zero is called:',
      options: [
        { optionText: 'Diagonal matrix', isCorrect: true },
        { optionText: 'Row matrix', isCorrect: false },
        { optionText: 'Column matrix', isCorrect: false },
        { optionText: 'Scalar matrix', isCorrect: false },
      ],
    },
    {
      questionText: 'If A and B are square matrices of the same order, then (AB)⁻¹ is equal to:',
      options: [
        { optionText: 'B⁻¹A⁻¹', isCorrect: true },
        { optionText: 'A⁻¹B⁻¹', isCorrect: false },
        { optionText: 'AB', isCorrect: false },
        { optionText: 'BA', isCorrect: false },
      ],
    },
  ];

  for (let i = 0; i < matricesQuestions.length; i++) {
    const qData = matricesQuestions[i];
    const question = await prisma.quizQuestion.create({
      data: {
        quizId: quizMath.id,
        questionText: qData.questionText,
        questionType: QuestionType.MCQ,
        marks: 5.0,
        sortOrder: i + 1,
      },
    });

    await prisma.quizOption.createMany({
      data: qData.options.map((opt, idx) => ({
        questionId: question.id,
        optionText: opt.optionText,
        isCorrect: opt.isCorrect,
        sortOrder: idx + 1,
      })),
    });
  }

  // Assignments (No default assignments seeded to start with a clean homework space)

  // ==========================================
  // 8. SEED INITIAL PROGRESS
  // ==========================================
  console.log('Seeding initial student progress...');

  // Mathematics progress
  await prisma.studentSubjectProgress.create({
    data: { studentId: dbStudent.id, subjectId: maths.id, isCompleted: false, completedPercentage: 0.0, unlocked: true },
  });
  await prisma.studentChapterProgress.create({
    data: { studentId: dbStudent.id, chapterId: chapterMatrices.id, isCompleted: false, completedPercentage: 0.0, unlocked: true },
  });
  await prisma.studentTopicProgress.create({
    data: { studentId: dbStudent.id, topicId: topicMath1.id, unlocked: true, isCompleted: false, watchPercent: 0.0, quizCompleted: false, assignmentCompleted: false, notesViewed: false },
  });
  await prisma.studentTopicProgress.create({
    data: { studentId: dbStudent.id, topicId: topicMath2.id, unlocked: false, isCompleted: false, watchPercent: 0.0, quizCompleted: false, assignmentCompleted: false, notesViewed: false },
  });

  // Physics progress
  await prisma.studentSubjectProgress.create({
    data: { studentId: dbStudent.id, subjectId: physics.id, isCompleted: false, completedPercentage: 0.0, unlocked: true },
  });
  await prisma.studentChapterProgress.create({
    data: { studentId: dbStudent.id, chapterId: chapterElectrostatics.id, isCompleted: false, completedPercentage: 0.0, unlocked: true },
  });
  await prisma.studentTopicProgress.create({
    data: { studentId: dbStudent.id, topicId: topicPhys1.id, unlocked: true, isCompleted: false, watchPercent: 0.0, quizCompleted: false, assignmentCompleted: false, notesViewed: false },
  });
  await prisma.studentTopicProgress.create({
    data: { studentId: dbStudent.id, topicId: topicPhys2.id, unlocked: false, isCompleted: false, watchPercent: 0.0, quizCompleted: false, assignmentCompleted: false, notesViewed: false },
  });

  // Chemistry progress
  await prisma.studentSubjectProgress.create({
    data: { studentId: dbStudent.id, subjectId: chemistry.id, isCompleted: false, completedPercentage: 0.0, unlocked: true },
  });
  await prisma.studentChapterProgress.create({
    data: { studentId: dbStudent.id, chapterId: chapterMetallurgy.id, isCompleted: false, completedPercentage: 0.0, unlocked: true },
  });
  await prisma.studentTopicProgress.create({
    data: { studentId: dbStudent.id, topicId: topicChem1.id, unlocked: true, isCompleted: false, watchPercent: 0.0, quizCompleted: false, assignmentCompleted: false, notesViewed: false },
  });
  await prisma.studentTopicProgress.create({
    data: { studentId: dbStudent.id, topicId: topicChem2.id, unlocked: false, isCompleted: false, watchPercent: 0.0, quizCompleted: false, assignmentCompleted: false, notesViewed: false },
  });


  // ==========================================
  // 9. SEED ANALYTICS & GAMIFICATION
  // ==========================================
  console.log('Seeding student analytics structures...');
  await prisma.studentAnalytics.create({
    data: {
      studentId: dbStudent.id,
      totalStudyTimeMinutes: 45,
      averageQuizScore: 90.0,
      overallCompletionRate: 15.0,
      xp: 2100,
    },
  });

  await prisma.learningStreak.create({
    data: {
      studentId: dbStudent.id,
      currentStreak: 9,
      longestStreak: 12,
      lastActivityDate: new Date(),
    },
  });

  await prisma.subjectStatistics.create({
    data: {
      studentId: dbStudent.id,
      subjectId: maths.id,
      topicsCompleted: 0,
      totalTopics: 2,
      quizzesTaken: 0,
      quizzesPassed: 0,
      averageScore: 0.0,
    },
  });

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
