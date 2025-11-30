# Salesiq Replica - Backend Service

A complete backend service for the Salesiq Replica project built with Node.js, Express, and MongoDB.

## Features

- ✅ User Authentication (Login/Register with JWT)
- ✅ User Management (Admin, Agent, Supervisor roles)
- ✅ Chat Management (Create, assign, close chats)
- ✅ Visitor Tracking (Track visitor activity and behavior)
- ✅ Message System (Send/receive messages with attachments)
- ✅ User Settings (Notifications, appearance, privacy, etc.)
- ✅ Real-time Status Updates
- ✅ MongoDB Integration

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (Local or MongoDB Atlas)
- npm or yarn

## Installation

1. **Clone the repository**
```bash
git clone <repository-url>
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

4. **Configure environment variables**
Edit `.env` file with your configuration:
```
MONGODB_URI=mongodb://localhost:27017/salesiq
PORT=5000
JWT_SECRET=your_super_secret_jwt_key
FRONTEND_URL=http://localhost:5173
```

5. **Start the server**

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication Routes (`/api/auth`)

- `POST /register` - Register new user
- `POST /login` - Login user
- `POST /logout` - Logout user
- `GET /me` - Get current user
- `POST /refresh-token` - Refresh JWT token

### User Routes (`/api/users`)

- `GET /` - Get all users (Admin only)
- `GET /:id` - Get user by ID
- `PUT /:id` - Update user profile
- `DELETE /:id` - Delete user (Admin only)
- `GET /status/online` - Get online users
- `PUT /:id/status` - Update user status

### Chat Routes (`/api/chats`)

- `GET /` - Get all chats
- `GET /:id` - Get chat by ID
- `POST /` - Create new chat
- `PUT /:id` - Update chat
- `POST /:id/assign` - Assign chat to agent
- `POST /:id/close` - Close chat
- `GET /agent/:agentId` - Get chats for specific agent

### Visitor Routes (`/api/visitors`)

- `GET /` - Get all visitors
- `GET /:id` - Get visitor by ID
- `POST /` - Create new visitor
- `PUT /:id` - Update visitor
- `POST /:id/track` - Track visitor activity
- `GET /active/now` - Get active visitors

### Conversation Routes (`/api/conversations`)

- `GET /:chatId` - Get all messages in chat
- `POST /:chatId/message` - Send agent message
- `POST /:chatId/visitor-message` - Send visitor message
- `PUT /:messageId/read` - Mark message as read
- `PUT /:chatId/read-all` - Mark all messages as read
- `DELETE /:messageId` - Delete message

### Settings Routes (`/api/settings`)

- `GET /` - Get user settings
- `PUT /` - Update user settings
- `PUT /notifications` - Update notification settings
- `PUT /appearance` - Update appearance settings

## Database Models

### User
- firstName, lastName, email, password
- phone, company, avatar
- role (admin, agent, supervisor)
- status (active, inactive, suspended)
- isOnline, lastSeen

### Chat
- chatId, visitorId, agentId
- status (active, closed, waiting, assigned)
- type (incoming, outgoing)
- source (website, mobile, email, phone)
- messages, tags, priority
- rating, feedback
- startedAt, closedAt, duration

### Message
- chatId, senderId, visitorId
- senderType (agent, visitor, system)
- content, attachments
- isRead, readAt

### Visitor
- visitorId, name, email, phone
- location (country, city, state, timezone)
- browser, operatingSystem, ipAddress
- deviceType (desktop, mobile, tablet)
- referrerUrl, currentPage
- visitCount, lastVisit, firstVisit
- customFields, tags, status

### Settings
- userId
- notifications (emailNotifications, pushNotifications, soundEnabled, etc.)
- appearance (theme, language, compactMode)
- privacy (showOnlineStatus, allowDirectMessages)
- autoReply (enabled, message)
- workingHours (enabled, startTime, endTime, timezone)

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Error Handling

All endpoints return consistent error responses:

```json
{
  "message": "Error message",
  "error": {}
}
```

## CORS Configuration

The backend is configured to accept requests from the frontend URL specified in the `.env` file. Update `FRONTEND_URL` to match your frontend deployment.

## Development

### Project Structure
```
salesiq-backend/
├── models/           # Database models
├── routes/           # API routes
├── middleware/       # Custom middleware
├── server.js         # Main server file
├── .env.example      # Environment variables template
└── package.json      # Dependencies
```

### Adding New Features

1. Create model in `models/` directory
2. Create routes in `routes/` directory
3. Import routes in `server.js`
4. Add middleware if needed in `middleware/` directory

## Deployment

### MongoDB Atlas Setup
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

### Deployment Platforms
- **Heroku**: `git push heroku main`
- **Railway**: Connect GitHub repo
- **Render**: Connect GitHub repo
- **Vercel**: Not recommended for backend (use Node.js hosting)

## Testing

To test the API, you can use:
- **Postman** - Import API collection
- **Thunder Client** - VS Code extension
- **cURL** - Command line

Example login request:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

## Security Considerations

- ✅ Passwords are hashed with bcryptjs
- ✅ JWT tokens for authentication
- ✅ CORS enabled for frontend only
- ✅ Input validation on all routes
- ⚠️ Change `JWT_SECRET` in production
- ⚠️ Use HTTPS in production
- ⚠️ Implement rate limiting for production
- ⚠️ Add request validation middleware

## Future Enhancements

- [ ] WebSocket support for real-time messaging
- [ ] File upload to cloud storage (AWS S3, Cloudinary)
- [ ] Email notifications
- [ ] SMS notifications
- [ ] Advanced analytics and reports
- [ ] Canned replies management
- [ ] Call integration
- [ ] Video chat integration
- [ ] AI-powered chatbot
- [ ] Multi-language support

## Support

For issues and questions, please create an issue in the repository.

## License

ISC
