import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  notifications: {
    emailNotifications: {
      type: Boolean,
      default: true
    },
    pushNotifications: {
      type: Boolean,
      default: true
    },
    soundEnabled: {
      type: Boolean,
      default: true
    },
    newChatAlert: {
      type: Boolean,
      default: true
    },
    assignmentAlert: {
      type: Boolean,
      default: true
    }
  },
  appearance: {
    theme: {
      type: String,
      enum: ['light', 'dark'],
      default: 'light'
    },
    language: {
      type: String,
      default: 'en'
    },
    compactMode: {
      type: Boolean,
      default: false
    }
  },
  privacy: {
    showOnlineStatus: {
      type: Boolean,
      default: true
    },
    allowDirectMessages: {
      type: Boolean,
      default: true
    }
  },
  autoReply: {
    enabled: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      default: ''
    }
  },
  workingHours: {
    enabled: {
      type: Boolean,
      default: false
    },
    startTime: String,
    endTime: String,
    timezone: String
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

export default mongoose.model('Settings', settingsSchema);
