import express from 'express';
import Chat from '../models/Chat.js';
import Message from '../models/Message.js';
import Visitor from '../models/Visitor.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/chats
// @desc    Get all chats
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const { status, type, agentId } = req.query;
    let query = {};

    if (status) query.status = status;
    if (type) query.type = type;
    if (agentId) query.agentId = agentId;

    const chats = await Chat.find(query)
      .populate('visitorId', 'name email phone')
      .populate('agentId', 'firstName lastName email')
      .sort({ updatedAt: -1 });

    res.status(200).json({ success: true, count: chats.length, chats });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/chats/:id
// @desc    Get chat by ID
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id)
      .populate('visitorId')
      .populate('agentId', 'firstName lastName email')
      .populate('messages');

    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    res.status(200).json({ success: true, chat });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/chats
// @desc    Create new chat
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { visitorId, subject, type, source } = req.body;

    const chat = await Chat.create({
      chatId: `CHAT-${Date.now()}`,
      visitorId,
      subject,
      type: type || 'incoming',
      source: source || 'website'
    });

    const populatedChat = await chat.populate('visitorId');

    res.status(201).json({ success: true, chat: populatedChat });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/chats/:id
// @desc    Update chat
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    const { status, agentId, priority, tags, subject } = req.body;

    const updateData = { updatedAt: new Date() };
    if (status) updateData.status = status;
    if (agentId) updateData.agentId = agentId;
    if (priority) updateData.priority = priority;
    if (tags) updateData.tags = tags;
    if (subject) updateData.subject = subject;

    const chat = await Chat.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).populate('visitorId').populate('agentId', 'firstName lastName email');

    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    res.status(200).json({ success: true, chat });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/chats/:id/assign
// @desc    Assign chat to agent
// @access  Private
router.post('/:id/assign', protect, async (req, res) => {
  try {
    const { agentId } = req.body;

    const chat = await Chat.findByIdAndUpdate(
      req.params.id,
      { agentId, status: 'assigned', updatedAt: new Date() },
      { new: true }
    ).populate('visitorId').populate('agentId', 'firstName lastName email');

    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    res.status(200).json({ success: true, chat });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/chats/:id/close
// @desc    Close chat
// @access  Private
router.post('/:id/close', protect, async (req, res) => {
  try {
    const { rating, feedback } = req.body;

    const chat = await Chat.findById(req.params.id);
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    const closedAt = new Date();
    const duration = Math.floor((closedAt - chat.startedAt) / 1000);

    const updatedChat = await Chat.findByIdAndUpdate(
      req.params.id,
      {
        status: 'closed',
        closedAt,
        duration,
        rating: rating || null,
        feedback: feedback || null,
        updatedAt: new Date()
      },
      { new: true }
    ).populate('visitorId').populate('agentId', 'firstName lastName email');

    res.status(200).json({ success: true, chat: updatedChat });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/chats/agent/:agentId
// @desc    Get chats assigned to agent
// @access  Private
router.get('/agent/:agentId', protect, async (req, res) => {
  try {
    const chats = await Chat.find({ agentId: req.params.agentId })
      .populate('visitorId', 'name email phone')
      .sort({ updatedAt: -1 });

    res.status(200).json({ success: true, count: chats.length, chats });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
