# 🚀 Salesiq Replica - Complete Setup & Deployment Guide

## 📋 Project Overview

**Salesiq Replica** is a full-stack web application for live chat, visitor tracking, and customer engagement. It includes:

- ✅ **Backend**: Node.js/Express with MongoDB
- ✅ **Frontend**: React with modern UI
- ✅ **Authentication**: JWT-based login/register
- ✅ **Real-time Features**: Chat, visitor tracking, notifications
- ✅ **Database**: MongoDB with complete schema

---

## 📁 Project Structure

```
Salesiq/
├── salesiq-backend/          # Node.js/Express Backend
│   ├── models/               # MongoDB schemas
│   ├── routes/               # API endpoints
│   ├── middleware/           # Auth & custom middleware
│   ├── server.js             # Main server file
│   ├── package.json          # Dependencies
│   ├── .env.example          # Environment template
│   ├── seed.js               # Sample data
│   └── README.md             # Backend docs
│
└── salesiq-app/              # React Frontend
    ├── src/
    │   ├── pages/            # Page components
    │   ├── components/       # Reusable components
    │   ├── layout/           # Layout components
    │   ├── styles/           # CSS files
    │   ├── services/         # API service
    │   └── App.jsx           # Main app
    ├── package.json          # Dependencies
    └── vite.config.js        # Vite config
```

---

## 🔧 Prerequisites

- **Node.js** v16+ ([Download](https://nodejs.org/))
- **npm** or **yarn**
- **MongoDB** (Local or Atlas)
- **Git** (Optional)
- **Postman** (For API testing)

---

## 📦 Installation & Setup

### Step 1: Setup MongoDB

#### Option A: Local MongoDB (Windows)

1. Download MongoDB Community Edition from https://www.mongodb.com/try/download/community
2. Run installer and follow setup wizard
3. MongoDB will run on `mongodb://localhost:27017`

#### Option B: MongoDB Atlas (Cloud - Recommended)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a new project
4. Create a cluster (M0 Free tier)
5. Create database user with password
6. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/salesiq`

### Step 2: Setup Backend

```bash
# Navigate to backend directory
cd salesiq-backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

**Edit `.env` file:**

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/salesiq
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/salesiq

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

**Start backend:**

```bash
# Development mode (with auto-reload)
npm run dev

# Or production mode
npm start
```

You should see:
```
✅ MongoDB connected successfully
🚀 Server running on http://localhost:5000
```

### Step 3: Seed Sample Data (Optional)

```bash
# In salesiq-backend directory
node seed.js
```

This creates:
- 3 sample users (admin, agent, supervisor)
- 3 sample visitors
- 3 sample chats
- 5 sample messages

### Step 4: Setup Frontend

```bash
# Navigate to frontend directory
cd ../salesiq-app

# Install dependencies
npm install

# Start development server
npm run dev
```

You should see:
```
VITE v5.x.x  ready in XXX ms

➜  Local:   http://localhost:5173/
```

---

## 🧪 Testing the Application

### Test 1: Register New Account

1. Open http://localhost:5173/register
2. Fill in the form:
   - First Name: John
   - Last Name: Doe
   - Email: john@example.com
   - Company: Tech Corp
   - Phone: +1 (555) 000-0000
   - Password: password123
   - Confirm Password: password123
3. Click "Create Account"
4. You should be redirected to dashboard

### Test 2: Login

1. Open http://localhost:5173/login
2. Enter credentials:
   - Email: john@example.com
   - Password: password123
3. Click "Sign In"
4. You should see the dashboard

### Test 3: Test with Sample Data

If you ran `seed.js`, use these credentials:

**Admin Account:**
- Email: admin@salesiq.com
- Password: password123

**Agent Account:**
- Email: sarah@salesiq.com
- Password: password123

### Test 4: API Testing with Postman

1. Open Postman
2. Create new collection "Salesiq API"

**Test Login Endpoint:**
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "admin@salesiq.com",
  "password": "password123"
}
```

Response:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "...",
    "firstName": "John",
    "email": "admin@salesiq.com",
    "role": "admin"
  }
}
```

**Test Protected Endpoint:**
```
GET http://localhost:5000/api/auth/me
Authorization: Bearer <your_token_from_login>
```

---

## 🔌 API Endpoints Reference

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/refresh-token` - Refresh JWT

### Users
- `GET /api/users` - Get all users (Admin)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user (Admin)
- `GET /api/users/status/online` - Get online users
- `PUT /api/users/:id/status` - Update user status

### Chats
- `GET /api/chats` - Get all chats
- `GET /api/chats/:id` - Get chat by ID
- `POST /api/chats` - Create new chat
- `PUT /api/chats/:id` - Update chat
- `POST /api/chats/:id/assign` - Assign to agent
- `POST /api/chats/:id/close` - Close chat
- `GET /api/chats/agent/:agentId` - Get agent's chats

### Visitors
- `GET /api/visitors` - Get all visitors
- `GET /api/visitors/:id` - Get visitor by ID
- `POST /api/visitors` - Create visitor
- `PUT /api/visitors/:id` - Update visitor
- `POST /api/visitors/:id/track` - Track activity
- `GET /api/visitors/active/now` - Get active visitors

### Messages
- `GET /api/conversations/:chatId` - Get chat messages
- `POST /api/conversations/:chatId/message` - Send agent message
- `POST /api/conversations/:chatId/visitor-message` - Send visitor message
- `PUT /api/conversations/:messageId/read` - Mark as read
- `PUT /api/conversations/:chatId/read-all` - Mark all as read
- `DELETE /api/conversations/:messageId` - Delete message

### Settings
- `GET /api/settings` - Get user settings
- `PUT /api/settings` - Update settings
- `PUT /api/settings/notifications` - Update notifications
- `PUT /api/settings/appearance` - Update appearance

---

## 🚀 Deployment

### Deploy Backend

#### Option 1: Heroku

```bash
# Install Heroku CLI
# https://devcenter.heroku.com/articles/heroku-cli

# Login to Heroku
heroku login

# Create app
heroku create salesiq-backend

# Set environment variables
heroku config:set MONGODB_URI=<your_mongodb_uri>
heroku config:set JWT_SECRET=<your_secret>
heroku config:set FRONTEND_URL=<your_frontend_url>

# Deploy
git push heroku main
```

#### Option 2: Railway

1. Go to https://railway.app
2. Connect GitHub repository
3. Set environment variables
4. Deploy

#### Option 3: Render

1. Go to https://render.com
2. Create new Web Service
3. Connect GitHub repository
4. Set environment variables
5. Deploy

### Deploy Frontend

#### Option 1: Netlify

```bash
# Build frontend
npm run build

# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

#### Option 2: Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

#### Option 3: GitHub Pages

```bash
# Update vite.config.js
export default {
  base: '/salesiq-app/',
  // ...
}

# Build and deploy
npm run build
# Push dist folder to gh-pages branch
```

---

## 🔐 Security Checklist

Before deploying to production:

- [ ] Change `JWT_SECRET` to a strong random string
- [ ] Enable HTTPS for all URLs
- [ ] Set `NODE_ENV=production`
- [ ] Update `FRONTEND_URL` to production domain
- [ ] Enable MongoDB authentication
- [ ] Implement rate limiting
- [ ] Add request validation
- [ ] Set up CORS properly
- [ ] Use environment variables for all secrets
- [ ] Enable HTTPS on MongoDB connection
- [ ] Set up SSL certificates
- [ ] Regular security audits

---

## 🐛 Troubleshooting

### Issue: MongoDB Connection Error

**Solution:**
- Check if MongoDB is running
- Verify connection string in `.env`
- For Atlas: Check IP whitelist and credentials
- Test connection: `mongosh "mongodb://localhost:27017"`

### Issue: CORS Error

**Solution:**
- Check `FRONTEND_URL` in backend `.env`
- Ensure it matches exactly (including protocol and port)
- Clear browser cache

### Issue: Login Not Working

**Solution:**
- Check if backend is running on port 5000
- Verify API endpoint in `src/services/api.js`
- Check browser console for errors
- Check backend terminal for error logs

### Issue: Port Already in Use

**Solution:**
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill process (Windows)
taskkill /PID <PID> /F

# Or change port in .env
PORT=5001
```

### Issue: Token Expired

**Solution:**
- Frontend automatically redirects to login
- Clear localStorage: `localStorage.clear()`
- Login again

---

## 📊 Database Models

### User Schema
```javascript
{
  firstName: String,
  lastName: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  company: String,
  role: 'admin' | 'agent' | 'supervisor',
  status: 'active' | 'inactive' | 'suspended',
  isOnline: Boolean,
  lastSeen: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Chat Schema
```javascript
{
  chatId: String (unique),
  visitorId: ObjectId,
  agentId: ObjectId,
  status: 'active' | 'closed' | 'waiting' | 'assigned',
  type: 'incoming' | 'outgoing',
  source: 'website' | 'mobile' | 'email' | 'phone',
  subject: String,
  messages: [ObjectId],
  tags: [String],
  priority: 'low' | 'medium' | 'high' | 'urgent',
  rating: Number (1-5),
  feedback: String,
  startedAt: Date,
  closedAt: Date,
  duration: Number (seconds),
  createdAt: Date,
  updatedAt: Date
}
```

### Message Schema
```javascript
{
  chatId: ObjectId,
  senderId: ObjectId,
  visitorId: ObjectId,
  senderType: 'agent' | 'visitor' | 'system',
  content: String,
  attachments: [Object],
  isRead: Boolean,
  readAt: Date,
  createdAt: Date
}
```

### Visitor Schema
```javascript
{
  visitorId: String (unique),
  name: String,
  email: String,
  phone: String,
  location: {
    country: String,
    city: String,
    state: String,
    timezone: String
  },
  browser: String,
  operatingSystem: String,
  ipAddress: String,
  deviceType: 'desktop' | 'mobile' | 'tablet',
  referrerUrl: String,
  currentPage: String,
  visitCount: Number,
  lastVisit: Date,
  firstVisit: Date,
  customFields: Map,
  tags: [String],
  status: 'active' | 'inactive' | 'blocked',
  createdAt: Date,
  updatedAt: Date
}
```

---

## 📚 Additional Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Guide](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [JWT Authentication](https://jwt.io/)
- [REST API Best Practices](https://restfulapi.net/)

---

## 🤝 Contributing

To add new features:

1. Create feature branch: `git checkout -b feature/new-feature`
2. Make changes
3. Test thoroughly
4. Commit: `git commit -m "Add new feature"`
5. Push: `git push origin feature/new-feature`
6. Create Pull Request

---

## 📝 License

ISC

---

## 🎯 Next Steps

1. ✅ Setup backend and frontend
2. ✅ Test login/register
3. ⏭️ Integrate API calls in dashboard pages
4. ⏭️ Add real-time messaging with WebSocket
5. ⏭️ Implement file uploads
6. ⏭️ Add email notifications
7. ⏭️ Create admin dashboard
8. ⏭️ Deploy to production

---

## 💬 Support

For issues or questions:
1. Check troubleshooting section
2. Review error logs
3. Check API documentation
4. Create GitHub issue

---

**Happy coding! 🚀**

Last Updated: November 2024
