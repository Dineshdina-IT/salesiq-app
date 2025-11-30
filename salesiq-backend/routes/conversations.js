import express from 'express';
import Message from '../models/Message.js';
import Chat from '../models/Chat.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/conversations/:chatId
// @desc    Get all messages in a chat
// @access  Private
router.get('/:chatId', protect, async (req, res) => {
  try {
    const messages = await Message.find({ chatId: req.params.chatId })
      .populate('senderId', 'firstName lastName avatar')
      .populate('visitorId', 'name avatar email')
      .sort({ createdAt: 1 });

    res.status(200).json({ success: true, count: messages.length, messages });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/conversations/:chatId/message
// @desc    Send message in chat
// @access  Private
router.post('/:chatId/message', protect, async (req, res) => {
  try {
    const { content, attachments, senderType } = req.body;

    if (!content && (!attachments || attachments.length === 0)) {
      return res.status(400).json({ message: 'Message content or attachments required' });
    }

    const chat = await Chat.findById(req.params.chatId);
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    const message = await Message.create({
      chatId: req.params.chatId,
      senderId: senderType === 'agent' ? req.user.id : null,
      senderType: senderType || 'agent',
      content,
      attachments: attachments || []
    });

    // Update chat's last message time
    await Chat.findByIdAndUpdate(
      req.params.chatId,
      { updatedAt: new Date() }
    );

    const populatedMessage = await message.populate('senderId', 'firstName lastName avatar');

    res.status(201).json({ success: true, message: populatedMessage });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/conversations/:chatId/visitor-message
// @desc    Visitor sends message
// @access  Public
router.post('/:chatId/visitor-message', async (req, res) => {
  try {
    const { content, visitorId, attachments } = req.body;

    if (!content && (!attachments || attachments.length === 0)) {
      return res.status(400).json({ message: 'Message content or attachments required' });
    }

    const chat = await Chat.findById(req.params.chatId);
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    const message = await Message.create({
      chatId: req.params.chatId,
      visitorId,
      senderType: 'visitor',
      content,
      attachments: attachments || []
    });

    // Update chat status if waiting
    if (chat.status === 'waiting') {
      await Chat.findByIdAndUpdate(req.params.chatId, { status: 'active' });
    }

    // Update chat's last message time
    await Chat.findByIdAndUpdate(
      req.params.chatId,
      { updatedAt: new Date() }
    );

    const populatedMessage = await message.populate('visitorId', 'name avatar email');

    res.status(201).json({ success: true, message: populatedMessage });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/conversations/:messageId/read
// @desc    Mark message as read
// @access  Private
router.put('/:messageId/read', protect, async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.messageId,
      { isRead: true, readAt: new Date() },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.status(200).json({ success: true, message });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/conversations/:chatId/read-all
// @desc    Mark all messages in chat as read
// @access  Private
router.put('/:chatId/read-all', protect, async (req, res) => {
  try {
    await Message.updateMany(
      { chatId: req.params.chatId, isRead: false },
      { isRead: true, readAt: new Date() }
    );

    res.status(200).json({ success: true, message: 'All messages marked as read' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/conversations/:messageId
// @desc    Delete message
// @access  Private
router.delete('/:messageId', protect, async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.messageId);

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.status(200).json({ success: true, message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
