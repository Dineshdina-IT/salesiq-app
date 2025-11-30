import express from 'express';
import Visitor from '../models/Visitor.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/visitors
// @desc    Get all visitors
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const { status, tags } = req.query;
    let query = {};

    if (status) query.status = status;
    if (tags) query.tags = { $in: tags.split(',') };

    const visitors = await Visitor.find(query).sort({ lastVisit: -1 });

    res.status(200).json({ success: true, count: visitors.length, visitors });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/visitors/:id
// @desc    Get visitor by ID
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const visitor = await Visitor.findById(req.params.id);

    if (!visitor) {
      return res.status(404).json({ message: 'Visitor not found' });
    }

    res.status(200).json({ success: true, visitor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/visitors
// @desc    Create new visitor
// @access  Public (from website)
router.post('/', async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      location,
      browser,
      operatingSystem,
      ipAddress,
      deviceType,
      referrerUrl,
      currentPage
    } = req.body;

    const visitor = await Visitor.create({
      visitorId: `VISITOR-${Date.now()}`,
      name,
      email,
      phone,
      location,
      browser,
      operatingSystem,
      ipAddress,
      deviceType: deviceType || 'desktop',
      referrerUrl,
      currentPage
    });

    res.status(201).json({ success: true, visitor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/visitors/:id
// @desc    Update visitor
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    const { name, email, phone, tags, customFields, status } = req.body;

    const updateData = { updatedAt: new Date() };
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (phone) updateData.phone = phone;
    if (tags) updateData.tags = tags;
    if (customFields) updateData.customFields = customFields;
    if (status) updateData.status = status;

    const visitor = await Visitor.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!visitor) {
      return res.status(404).json({ message: 'Visitor not found' });
    }

    res.status(200).json({ success: true, visitor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/visitors/:id/track
// @desc    Track visitor activity
// @access  Public
router.post('/:id/track', async (req, res) => {
  try {
    const { currentPage, referrerUrl } = req.body;

    const visitor = await Visitor.findByIdAndUpdate(
      req.params.id,
      {
        currentPage,
        referrerUrl,
        lastVisit: new Date(),
        $inc: { visitCount: 1 }
      },
      { new: true }
    );

    if (!visitor) {
      return res.status(404).json({ message: 'Visitor not found' });
    }

    res.status(200).json({ success: true, visitor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/visitors/active/now
// @desc    Get active visitors
// @access  Private
router.get('/active/now', protect, async (req, res) => {
  try {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    const activeVisitors = await Visitor.find({
      lastVisit: { $gte: fiveMinutesAgo },
      status: 'active'
    });

    res.status(200).json({ success: true, count: activeVisitors.length, visitors: activeVisitors });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
