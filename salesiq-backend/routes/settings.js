import express from 'express';
import Settings from '../models/Settings.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/settings
// @desc    Get user settings
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    let settings = await Settings.findOne({ userId: req.user.id });

    // Create default settings if not exists
    if (!settings) {
      settings = await Settings.create({ userId: req.user.id });
    }

    res.status(200).json({ success: true, settings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/settings
// @desc    Update user settings
// @access  Private
router.put('/', protect, async (req, res) => {
  try {
    const { notifications, appearance, privacy, autoReply, workingHours } = req.body;

    let settings = await Settings.findOne({ userId: req.user.id });

    if (!settings) {
      settings = new Settings({ userId: req.user.id });
    }

    if (notifications) settings.notifications = { ...settings.notifications, ...notifications };
    if (appearance) settings.appearance = { ...settings.appearance, ...appearance };
    if (privacy) settings.privacy = { ...settings.privacy, ...privacy };
    if (autoReply) settings.autoReply = { ...settings.autoReply, ...autoReply };
    if (workingHours) settings.workingHours = { ...settings.workingHours, ...workingHours };

    settings.updatedAt = new Date();
    await settings.save();

    res.status(200).json({ success: true, settings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/settings/notifications
// @desc    Update notification settings
// @access  Private
router.put('/notifications', protect, async (req, res) => {
  try {
    const settings = await Settings.findOneAndUpdate(
      { userId: req.user.id },
      { notifications: req.body, updatedAt: new Date() },
      { new: true, upsert: true }
    );

    res.status(200).json({ success: true, settings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/settings/appearance
// @desc    Update appearance settings
// @access  Private
router.put('/appearance', protect, async (req, res) => {
  try {
    const settings = await Settings.findOneAndUpdate(
      { userId: req.user.id },
      { appearance: req.body, updatedAt: new Date() },
      { new: true, upsert: true }
    );

    res.status(200).json({ success: true, settings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
