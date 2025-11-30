import mongoose from 'mongoose';

const visitorSchema = new mongoose.Schema({
  visitorId: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    lowercase: true,
    sparse: true
  },
  phone: {
    type: String,
    trim: true
  },
  avatar: {
    type: String,
    default: null
  },
  location: {
    country: String,
    city: String,
    state: String,
    timezone: String
  },
  browser: {
    type: String
  },
  operatingSystem: {
    type: String
  },
  ipAddress: {
    type: String
  },
  deviceType: {
    type: String,
    enum: ['desktop', 'mobile', 'tablet'],
    default: 'desktop'
  },
  referrerUrl: {
    type: String
  },
  currentPage: {
    type: String
  },
  visitCount: {
    type: Number,
    default: 1
  },
  lastVisit: {
    type: Date,
    default: Date.now
  },
  firstVisit: {
    type: Date,
    default: Date.now
  },
  customFields: {
    type: Map,
    of: String
  },
  tags: [String],
  status: {
    type: String,
    enum: ['active', 'inactive', 'blocked'],
    default: 'active'
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

export default mongoose.model('Visitor', visitorSchema);
