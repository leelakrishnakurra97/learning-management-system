import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// Get user notifications
router.get('/notifications', requireAuth, async (req, res) => {
  try {
    const userNotifications = await prisma.userNotification.findMany({
      where: { userId: req.auth!.userId },
      include: {
        notification: true
      },
      orderBy: {
        notification: {
          createdAt: 'desc'
        }
      }
    });

    const mapped = userNotifications.map(un => ({
      id: un.notification.id,
      title: un.notification.title,
      message: un.notification.body,
      type: un.notification.type.toLowerCase(), // success, info, alert
      read: un.isRead,
      time: un.notification.createdAt.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit'
      })
    }));

    res.json({ notifications: mapped });
  } catch (err) {
    console.error('Failed to fetch notifications:', err);
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
});

// Mark all as read
router.post('/notifications/read', requireAuth, async (req, res) => {
  try {
    await prisma.userNotification.updateMany({
      where: { userId: req.auth!.userId },
      data: {
        isRead: true,
        readAt: new Date()
      }
    });
    res.json({ success: true });
  } catch (err) {
    console.error('Failed to mark notifications as read:', err);
    res.status(500).json({ error: 'Failed to mark notifications as read' });
  }
});

export default router;
