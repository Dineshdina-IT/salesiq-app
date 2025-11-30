import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Visitor from './models/Visitor.js';
import Chat from './models/Chat.js';
import Message from './models/Message.js';
import Settings from './models/Settings.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/salesiq');
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Visitor.deleteMany({});
    await Chat.deleteMany({});
    await Message.deleteMany({});
    await Settings.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create sample users
    const users = await User.create([
      {
        firstName: 'John',
        lastName: 'Admin',
        email: 'admin@salesiq.com',
        password: 'password123',
        phone: '+1 (555) 000-0000',
        company: 'SalesIQ Inc',
        role: 'admin',
        status: 'active',
        isOnline: true
      },
      {
        firstName: 'Sarah',
        lastName: 'Agent',
        email: 'sarah@salesiq.com',
        password: 'password123',
        phone: '+1 (555) 111-1111',
        company: 'SalesIQ Inc',
        role: 'agent',
        status: 'active',
        isOnline: true
      },
      {
        firstName: 'Mike',
        lastName: 'Supervisor',
        email: 'mike@salesiq.com',
        password: 'password123',
        phone: '+1 (555) 222-2222',
        company: 'SalesIQ Inc',
        role: 'supervisor',
        status: 'active',
        isOnline: false
      }
    ]);
    console.log('👥 Created 3 sample users');

    // Create settings for each user
    await Settings.create([
      { userId: users[0]._id },
      { userId: users[1]._id },
      { userId: users[2]._id }
    ]);
    console.log('⚙️  Created user settings');

    // Create sample visitors
    const visitors = await Visitor.create([
      {
        visitorId: 'VISITOR-001',
        name: 'Alice Johnson',
        email: 'alice@example.com',
        phone: '+1 (555) 333-3333',
        location: {
          country: 'United States',
          city: 'New York',
          state: 'NY',
          timezone: 'EST'
        },
        browser: 'Chrome',
        operatingSystem: 'Windows 10',
        ipAddress: '192.168.1.100',
        deviceType: 'desktop',
        referrerUrl: 'https://google.com',
        currentPage: '/products',
        visitCount: 3,
        tags: ['vip', 'returning'],
        status: 'active'
      },
      {
        visitorId: 'VISITOR-002',
        name: 'Bob Smith',
        email: 'bob@example.com',
        phone: '+1 (555) 444-4444',
        location: {
          country: 'United States',
          city: 'Los Angeles',
          state: 'CA',
          timezone: 'PST'
        },
        browser: 'Safari',
        operatingSystem: 'macOS',
        ipAddress: '192.168.1.101',
        deviceType: 'desktop',
        referrerUrl: 'https://facebook.com',
        currentPage: '/pricing',
        visitCount: 1,
        tags: ['new'],
        status: 'active'
      },
      {
        visitorId: 'VISITOR-003',
        name: 'Carol White',
        email: 'carol@example.com',
        phone: '+1 (555) 555-5555',
        location: {
          country: 'United States',
          city: 'Chicago',
          state: 'IL',
          timezone: 'CST'
        },
        browser: 'Firefox',
        operatingSystem: 'Ubuntu',
        ipAddress: '192.168.1.102',
        deviceType: 'mobile',
        referrerUrl: 'https://linkedin.com',
        currentPage: '/contact',
        visitCount: 2,
        tags: ['interested'],
        status: 'active'
      }
    ]);
    console.log('👁️  Created 3 sample visitors');

    // Create sample chats
    const chats = await Chat.create([
      {
        chatId: 'CHAT-001',
        visitorId: visitors[0]._id,
        agentId: users[1]._id,
        status: 'closed',
        type: 'incoming',
        source: 'website',
        subject: 'Product Inquiry',
        tags: ['sales', 'resolved'],
        priority: 'high',
        rating: 5,
        feedback: 'Great support!',
        startedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        closedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 30 * 60 * 1000),
        duration: 1800
      },
      {
        chatId: 'CHAT-002',
        visitorId: visitors[1]._id,
        agentId: users[1]._id,
        status: 'active',
        type: 'incoming',
        source: 'website',
        subject: 'Pricing Question',
        tags: ['sales'],
        priority: 'medium',
        startedAt: new Date(Date.now() - 30 * 60 * 1000)
      },
      {
        chatId: 'CHAT-003',
        visitorId: visitors[2]._id,
        status: 'waiting',
        type: 'incoming',
        source: 'website',
        subject: 'Technical Support',
        tags: ['support'],
        priority: 'high',
        startedAt: new Date(Date.now() - 5 * 60 * 1000)
      }
    ]);
    console.log('💬 Created 3 sample chats');

    // Create sample messages
    const messages = await Message.create([
      {
        chatId: chats[0]._id,
        senderId: users[1]._id,
        senderType: 'agent',
        content: 'Hello! Welcome to SalesIQ. How can I help you today?'
      },
      {
        chatId: chats[0]._id,
        visitorId: visitors[0]._id,
        senderType: 'visitor',
        content: 'Hi! I wanted to know more about your enterprise plan.'
      },
      {
        chatId: chats[0]._id,
        senderId: users[1]._id,
        senderType: 'agent',
        content: 'Of course! Our enterprise plan includes unlimited users, priority support, and custom integrations.'
      },
      {
        chatId: chats[1]._id,
        senderId: users[1]._id,
        senderType: 'agent',
        content: 'Hi there! Thanks for visiting SalesIQ. What can I help you with?'
      },
      {
        chatId: chats[1]._id,
        visitorId: visitors[1]._id,
        senderType: 'visitor',
        content: 'I\'m interested in your pricing. Can you tell me more?'
      }
    ]);
    console.log('📝 Created 5 sample messages');

    // Update chats with message references
    await Chat.findByIdAndUpdate(chats[0]._id, {
      messages: [messages[0]._id, messages[1]._id, messages[2]._id]
    });
    await Chat.findByIdAndUpdate(chats[1]._id, {
      messages: [messages[3]._id, messages[4]._id]
    });

    console.log('\n✅ Database seeded successfully!\n');
    console.log('Sample Login Credentials:');
    console.log('------------------------');
    console.log('Admin:');
    console.log('  Email: admin@salesiq.com');
    console.log('  Password: password123\n');
    console.log('Agent:');
    console.log('  Email: sarah@salesiq.com');
    console.log('  Password: password123\n');
    console.log('Supervisor:');
    console.log('  Email: mike@salesiq.com');
    console.log('  Password: password123\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
