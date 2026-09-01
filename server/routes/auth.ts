import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../lib/prisma.js';
import { mapUserProfile } from '../lib/mappers.js';
import { signToken, requireAuth, requireAdmin } from '../middleware/auth.js';
import { generateSecurePassword, sendCredentialsEmail, sendSubscriptionConfirmationEmail, sendOtpEmail } from '../lib/emailService.js';

const router = Router();

// In-memory store for OTPs (email -> { otp, expiresAt })
const passwordResetStore = new Map<string, { otp: string; expiresAt: number }>();

// Dev-only helper: return OTP for testing (only available when not in production)
router.get('/debug/otp', async (req, res) => {
  if (process.env.NODE_ENV === 'production') return res.status(404).end();
  const { email } = req.query as { email?: string };
  if (!email) return res.status(400).json({ error: 'Email is required' });
  const record = passwordResetStore.get(email.toLowerCase());
  if (!record) return res.status(404).json({ error: 'No OTP for this email' });
  return res.json({ email: email.toLowerCase(), otp: record.otp, expiresAt: record.expiresAt });
});

async function loadUser(email: string) {
  return prisma.user.findUnique({
    where: { email },
    include: {
      studentProfile: {
        include: {
          analytics: true,
          learningStreak: true,
        },
      },
      teacherProfile: true,
      adminProfile: true,
    },
  });
}

// Check if email already exists
router.get('/check-email', async (req, res) => {
  const { email } = req.query as { email?: string };
  if (!email) {
    return res.status(400).json({ error: 'Email parameter is required' });
  }
  const existing = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });
  return res.json({ exists: !!existing });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body as { email?: string; password?: string };
  if (password) {
    const charCodes = Array.from(password).map(c => c.charCodeAt(0)).join(', ');
    console.log(`[server] Login attempt: email="${email}", passwordLength=${password.length}, charCodes=[${charCodes}]`);
  } else {
    console.log(`[server] Login attempt: email="${email}", password=undefined`);
  }
  if (!email || !password) {
    console.warn(`[server] Login failed: Missing email or password in request body`);
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const user = await loadUser(email.toLowerCase());
  if (!user) {
    console.warn(`[server] Login failed: User not found in database for email="${email}"`);
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    console.warn(`[server] Login failed: Password mismatch for email="${email}"`);
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = signToken({ userId: user.id, role: user.role });
  const profile = mapUserProfile({
    ...user,
    studentProfile: user.studentProfile,
  });

  return res.json({
    token,
    user: profile,
    role: user.role.toLowerCase(),
  });
});

router.post('/signup', async (req, res) => {
  const { email, password, firstName, lastName, role, boardId, classId } = req.body as {
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    role?: string;
    boardId?: string;
    classId?: string;
  };

  if (!email || !firstName || !lastName || !role) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const existing = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    if (existing) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    // Generate a secure random password
    const generatedPassword = generateSecurePassword();
    const passwordHash = await bcrypt.hash(generatedPassword, 10);
    const userRole = role.toUpperCase() as 'STUDENT' | 'TEACHER' | 'ADMIN';

    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        passwordHash,
        firstName,
        lastName,
        role: userRole,
        ...(userRole === 'STUDENT' && boardId && classId
          ? {
              studentProfile: {
                create: {
                  boardId,
                  classId,
                  analytics: { create: { xp: 100 } },
                  learningStreak: { create: { currentStreak: 1, longestStreak: 1 } },
                },
              },
            }
          : {}),
        ...(userRole === 'TEACHER'
          ? {
              teacherProfile: {
                create: {
                  bio: 'Nexora Learning instructor',
                  qualification: 'Subject expert',
                },
              },
            }
          : {}),
        ...(userRole === 'ADMIN'
          ? {
              adminProfile: {
                create: { dept: 'Operations' },
              },
            }
          : {}),
      },
      include: {
        studentProfile: {
          include: {
            analytics: true,
            learningStreak: true,
          },
        },
      },
    });

    // Send credentials email but DO NOT show password in response
    await sendCredentialsEmail(email.toLowerCase(), firstName, lastName, generatedPassword, userRole);

    // Return only success message, NO password in response
    return res.status(201).json({
      success: true,
      message: 'Account created successfully. Check your email for credentials.',
      email: email.toLowerCase(),
      role: userRole.toLowerCase(),
    });
  } catch (error: any) {
    console.error('Signup error:', error);
    return res.status(500).json({ error: error.message || 'Failed to create account' });
  }
});

/**
 * Subscription confirmation endpoint
 * Called when user clicks "Subscribe" button on subscription page
 * Sends credentials email and redirects to login
 */
router.post('/subscribe', async (req, res) => {
  const { email, subscriptionPlan } = req.body as {
    email?: string;
    subscriptionPlan?: string;
  };

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Only generate a new password if the user does not have a password hash yet
    let generatedPassword = "";
    if (!user.passwordHash || user.passwordHash.length < 10) {
      generatedPassword = generateSecurePassword();
      const passwordHash = await bcrypt.hash(generatedPassword, 10);
      await prisma.user.update({
        where: { id: user.id },
        data: { passwordHash },
      });
    } else {
      generatedPassword = "Use the temporary password sent in your registration email.";
    }

    const emailSent = await sendSubscriptionConfirmationEmail(
      email.toLowerCase(),
      user.firstName,
      user.lastName,
      generatedPassword,
      user.role,
      subscriptionPlan || 'Full Academic Access Pass'
    );

    if (emailSent) {
      return res.json({
        success: true,
        message: 'Subscription confirmed. Credentials sent to email.',
        redirectTo: '/#/login',
      });
    } else {
      return res.status(500).json({ error: 'Failed to send confirmation email' });
    }
  } catch (error: any) {
    console.error('Subscription error:', error);
    return res.status(500).json({ error: error.message || 'Subscription failed' });
  }
});

// User Management CRUD for Admin Configurable Users
router.get('/users', requireAuth, requireAdmin, async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        studentProfile: {
          include: {
            class: true,
            board: true,
          }
        },
        teacherProfile: true,
        adminProfile: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    return res.json(users);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

router.post('/users', requireAuth, requireAdmin, async (req, res) => {
  const { email, password, firstName, lastName, role, boardId, classId, dept, bio, qualification } = req.body;
  
  if (!email || !password || !firstName || !lastName || !role) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const existing = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    if (existing) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const userRole = role.toUpperCase() as 'STUDENT' | 'TEACHER' | 'ADMIN';

    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        passwordHash,
        firstName,
        lastName,
        role: userRole,
        ...(userRole === 'STUDENT' && boardId && classId
          ? {
              studentProfile: {
                create: {
                  boardId,
                  classId,
                  analytics: { create: { xp: 100 } },
                  learningStreak: { create: { currentStreak: 1, longestStreak: 1 } },
                },
              },
            }
          : {}),
        ...(userRole === 'TEACHER'
          ? {
              teacherProfile: {
                create: {
                  bio: bio || 'EduVerse instructor',
                  qualification: qualification || 'Subject expert',
                },
              },
            }
          : {}),
        ...(userRole === 'ADMIN'
          ? {
              adminProfile: {
                create: { dept: dept || 'Operations' },
              },
            }
          : {}),
      },
    });

    return res.status(201).json(user);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

router.put('/users/:id', requireAuth, requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { email, password, firstName, lastName, role, boardId, classId, dept, bio, qualification } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const data: any = {};
    if (email) data.email = email.toLowerCase();
    if (firstName) data.firstName = firstName;
    if (lastName) data.lastName = lastName;
    if (role) data.role = role.toUpperCase();
    if (password) {
      data.passwordHash = await bcrypt.hash(password, 10);
    }

    const userRole = (role || user.role).toUpperCase();
    
    if (userRole === 'STUDENT') {
      data.studentProfile = {
        upsert: {
          create: {
            boardId: boardId || '',
            classId: classId || '',
          },
          update: {
            boardId: boardId,
            classId: classId,
          }
        }
      };
    } else if (userRole === 'TEACHER') {
      data.teacherProfile = {
        upsert: {
          create: {
            bio: bio || '',
            qualification: qualification || '',
          },
          update: {
            bio,
            qualification,
          }
        }
      };
    } else if (userRole === 'ADMIN') {
      data.adminProfile = {
        upsert: {
          create: {
            dept: dept || 'Operations',
          },
          update: {
            dept,
          }
        }
      };
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data,
    });

    return res.json(updatedUser);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

router.delete('/users/:id', requireAuth, requireAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await prisma.user.delete({ where: { id } });
    return res.json({ success: true });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

router.post('/logout', (_req, res) => {
  res.json({ success: true });
});

export default router;

// Forgot password: send OTP
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body as { email?: string };
  if (!email) return res.status(400).json({ error: 'Email is required' });

  try {
    const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes
    passwordResetStore.set(email.toLowerCase(), { otp, expiresAt });

    const sent = await sendOtpEmail(email.toLowerCase(), otp);
    if (!sent) return res.status(500).json({ error: 'Failed to send OTP' });

    return res.json({ success: true, message: 'OTP sent to email' });
  } catch (err: any) {
    console.error('Forgot password error:', err);
    return res.status(500).json({ error: err.message || 'Failed to process request' });
  }
});

// Reset password: verify OTP and set new password
router.post('/reset-password', async (req, res) => {
  const { email, otp, newPassword } = req.body as { email?: string; otp?: string; newPassword?: string };
  if (!email || !otp || !newPassword) return res.status(400).json({ error: 'Missing required fields' });

  try {
    const record = passwordResetStore.get(email.toLowerCase());
    if (!record) return res.status(400).json({ error: 'No OTP requested for this email' });
    if (record.expiresAt < Date.now()) {
      passwordResetStore.delete(email.toLowerCase());
      return res.status(400).json({ error: 'OTP expired' });
    }
    if (record.otp !== otp) return res.status(400).json({ error: 'Invalid OTP' });

    const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const passwordHash = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({ where: { id: user.id }, data: { passwordHash } });

    passwordResetStore.delete(email.toLowerCase());
    return res.json({ success: true, message: 'Password reset successful' });
  } catch (err: any) {
    console.error('Reset password error:', err);
    return res.status(500).json({ error: err.message || 'Failed to reset password' });
  }
});

