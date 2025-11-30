import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  chatId: {
    type: String,
    unique: true,
    required: true
  },
  visitorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Visitor',
    required: true
  },
  agentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  status: {
    type: String,
    enum: ['active', 'closed', 'waiting', 'assigned'],
    default: 'waiting'
  },
  type: {
    type: String,
    enum: ['incoming', 'outgoing'],
    default: 'incoming'
  },
  source: {
    type: String,
    enum: ['website', 'mobile', 'email', 'phone'],
    default: 'website'
  },
  subject: {
    type: String,
    trim: true
  },
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  }],
  tags: [String],
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: null
  },
  feedback: {
    type: String,
    default: null
  },
  startedAt: {
    type: Date,
    default: Date.now
  },
  closedAt: {
    type: Date,
    default: null
  },
  duration: {
    type: Number, // in seconds
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Chat', chatSchema);
