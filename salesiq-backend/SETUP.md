# Salesiq Replica - Complete Setup Guide

## Quick Start

### Backend Setup

1. **Navigate to backend directory**
```bash
cd salesiq-backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create `.env` file**
```bash
cp .env.example .env
```

4. **Configure MongoDB**

**Option A: Local MongoDB**
- Install MongoDB Community Edition
- Start MongoDB service
- Update `.env`:
```
MONGODB_URI=mongodb://localhost:27017/salesiq
```

**Option B: MongoDB Atlas (Cloud)**
- Go to https://www.mongodb.com/cloud/atlas
- Create free account
- Create cluster
- Get connection string
- Update `.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/salesiq
```

5. **Start backend server**
```bash
npm run dev
```

Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd ../salesiq-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Start frontend development server**
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## Testing the Application

### 1. Register New Account

**URL**: `http://localhost:5173/register`

Fill in:
- First Name: John
- Last Name: Doe
- Email: john@example.com
- Company: Your Company
- Phone: +1 (555) 000-0000
- Password: password123
- Confirm Password: password123

Click "Create Account"

### 2. Login

**URL**: `http://localhost:5173/login`

Use credentials:
- Email: john@example.com
- Password: password123

Click "Sign In"

### 3. Test API Endpoints with Postman

**Import Collection:**
1. Open Postman
2. Create new collection "Salesiq API"
3. Add requests as shown below

#### Authentication Endpoints

**Register User**
```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "company": "Tech Corp",
  "phone": "+1 (555) 000-0000"
}
```

**Login**
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

Response will include JWT token:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "...",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "role": "agent"
  }
}
```

**Get Current User**
```
GET http://localhost:5000/api/auth/me
Authorization: Bearer <your_token>
```

#### Chat Endpoints

**Create Chat**
```
POST http://localhost:5000/api/chats
Authorization: Bearer <your_token>
Content-Type: application/json

{
  "visitorId": "visitor_id_here",
  "subject": "Product Inquiry",
  "type": "incoming",
  "source": "website"
}
```

**Get All Chats**
```
GET http://localhost:5000/api/chats
Authorization: Bearer <your_token>
```

**Get Chat by ID**
```
GET http://localhost:5000/api/chats/chat_id_here
Authorization: Bearer <your_token>
```

**Update Chat**
```
PUT http://localhost:5000/api/chats/chat_id_here
Authorization: Bearer <your_token>
Content-Type: application/json

{
  "status": "assigned",
  "priority": "high",
  "tags": ["urgent", "sales"]
}
```

**Assign Chat to Agent**
```
POST http://localhost:5000/api/chats/chat_id_here/assign
Authorization: Bearer <your_token>
Content-Type: application/json

{
  "agentId": "agent_id_here"
}
```

**Close Chat**
```
POST http://localhost:5000/api/chats/chat_id_here/close
Authorization: Bearer <your_token>
Content-Type: application/json

{
  "rating": 5,
  "feedback": "Great service!"
}
```

#### Visitor Endpoints

**Create Visitor**
```
POST http://localhost:5000/api/visitors
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+1 (555) 111-1111",
  "browser": "Chrome",
  "operatingSystem": "Windows 10",
  "ipAddress": "192.168.1.1",
  "deviceType": "desktop",
  "currentPage": "/products",
  "referrerUrl": "https://google.com"
}
```

**Get All Visitors**
```
GET http://localhost:5000/api/visitors
Authorization: Bearer <your_token>
```

**Get Active Visitors**
```
GET http://localhost:5000/api/visitors/active/now
Authorization: Bearer <your_token>
```

**Update Visitor**
```
PUT http://localhost:5000/api/visitors/visitor_id_here
Authorization: Bearer <your_token>
Content-Type: application/json

{
  "name": "Jane Smith Updated",
  "tags": ["vip", "returning"],
  "status": "active"
}
```

#### Message Endpoints

**Get Chat Messages**
```
GET http://localhost:5000/api/conversations/chat_id_here
Authorization: Bearer <your_token>
```

**Send Agent Message**
```
POST http://localhost:5000/api/conversations/chat_id_here/message
Authorization: Bearer <your_token>
Content-Type: application/json

{
  "content": "Hello! How can I help you?",
  "senderType": "agent"
}
```

**Send Visitor Message**
```
POST http://localhost:5000/api/conversations/chat_id_here/visitor-message
Content-Type: application/json

{
  "content": "Hi, I have a question about your product",
  "visitorId": "visitor_id_here"
}
```

**Mark Message as Read**
```
PUT http://localhost:5000/api/conversations/message_id_here/read
Authorization: Bearer <your_token>
```

#### Settings Endpoints

**Get User Settings**
```
GET http://localhost:5000/api/settings
Authorization: Bearer <your_token>
```

**Update Settings**
```
PUT http://localhost:5000/api/settings
Authorization: Bearer <your_token>
Content-Type: application/json

{
  "notifications": {
    "emailNotifications": true,
    "pushNotifications": true,
    "soundEnabled": true
  },
  "appearance": {
    "theme": "dark",
    "language": "en"
  }
}
```

## Database Structure

### Collections Created

1. **users** - User accounts and profiles
2. **chats** - Chat conversations
3. **messages** - Individual messages
4. **visitors** - Website visitors
5. **settings** - User preferences

### Sample Data

You can seed the database with sample data by running:

```bash
# Create a seed.js file in backend root
node seed.js
```

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify network access (if using Atlas)

### CORS Error
- Check `FRONTEND_URL` in `.env`
- Ensure frontend URL matches exactly

### Token Expired
- Frontend will automatically redirect to login
- Clear localStorage and login again

### Port Already in Use
- Backend: Change PORT in `.env`
- Frontend: Use `npm run dev -- --port 3000`

## Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/salesiq
PORT=5000
NODE_ENV=development
JWT_SECRET=your_super_secret_key
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
```

### Frontend (src/services/api.js)
Update `API_BASE_URL` if backend runs on different port:
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

## Deployment

### Deploy Backend

**Heroku:**
```bash
heroku create salesiq-backend
git push heroku main
```

**Railway:**
1. Connect GitHub repo
2. Set environment variables
3. Deploy

**Render:**
1. Connect GitHub repo
2. Set environment variables
3. Deploy

### Deploy Frontend

**Netlify:**
```bash
npm run build
netlify deploy --prod --dir=dist
```

**Vercel:**
```bash
npm run build
vercel --prod
```

## Next Steps

1. ✅ Backend API is ready
2. ✅ Frontend login/register pages created
3. ⏭️ Integrate API calls in dashboard pages
4. ⏭️ Add real-time messaging with WebSocket
5. ⏭️ Implement file uploads
6. ⏭️ Add email notifications
7. ⏭️ Create admin dashboard

## Support

For issues:
1. Check console logs (browser DevTools)
2. Check backend terminal output
3. Verify MongoDB connection
4. Check network tab in DevTools
5. Review API documentation in README.md

## Security Checklist

- [ ] Change JWT_SECRET in production
- [ ] Use HTTPS in production
- [ ] Enable CORS only for your domain
- [ ] Implement rate limiting
- [ ] Add input validation
- [ ] Use environment variables for secrets
- [ ] Enable MongoDB authentication
- [ ] Regular security audits

Happy coding! 🚀
