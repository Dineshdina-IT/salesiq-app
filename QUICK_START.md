# ⚡ Quick Start Guide - Salesiq Replica

## 🚀 Get Running in 5 Minutes

### Prerequisites
- Node.js v16+
- MongoDB (local or Atlas)

### Step 1: Start Backend (Terminal 1)

```bash
cd salesiq-backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI
npm run dev
```

**Expected output:**
```
✅ MongoDB connected successfully
🚀 Server running on http://localhost:5000
```

### Step 2: Start Frontend (Terminal 2)

```bash
cd salesiq-app
npm install
npm run dev
```

**Expected output:**
```
➜  Local:   http://localhost:5173/
```

### Step 3: Test Application

1. Open http://localhost:5173/register
2. Create account:
   - Email: test@example.com
   - Password: password123
3. Login with same credentials
4. You're in! 🎉

---

## 📝 Sample Test Credentials

If you ran `node seed.js` in backend:

```
Admin:
  Email: admin@salesiq.com
  Password: password123

Agent:
  Email: sarah@salesiq.com
  Password: password123
```

---

## 🔧 Quick Commands

### Backend
```bash
npm run dev          # Start development server
npm start            # Start production server
node seed.js         # Load sample data
```

### Frontend
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
```

---

## 🧪 Test API Endpoints

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@salesiq.com","password":"password123"}'
```

### Get Current User
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Get All Chats
```bash
curl -X GET http://localhost:5000/api/chats \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 📁 Key Files

### Backend
- `server.js` - Main server entry point
- `models/` - Database schemas
- `routes/` - API endpoints
- `.env` - Configuration

### Frontend
- `src/App.jsx` - Main app component
- `src/pages/Login.jsx` - Login page
- `src/services/api.js` - API client
- `src/styles/login.css` - Login styles

---

## ❌ Common Issues & Fixes

### MongoDB Connection Failed
```
Solution: Check MONGODB_URI in .env
For local: mongodb://localhost:27017/salesiq
For Atlas: mongodb+srv://user:pass@cluster.mongodb.net/salesiq
```

### Port 5000 Already in Use
```
Solution: Change PORT in .env or kill process
Windows: netstat -ano | findstr :5000
        taskkill /PID <PID> /F
```

### CORS Error
```
Solution: Ensure FRONTEND_URL in .env matches your frontend URL
FRONTEND_URL=http://localhost:5173
```

### Login Not Working
```
Solution: 
1. Check backend is running on port 5000
2. Check browser console for errors
3. Verify API_BASE_URL in src/services/api.js
```

---

## 🎯 Next Steps

1. ✅ Backend running
2. ✅ Frontend running
3. ✅ Login/Register working
4. ⏭️ Integrate API in dashboard pages
5. ⏭️ Add real-time features
6. ⏭️ Deploy to production

---

## 📚 Full Documentation

See `COMPLETE_SETUP_GUIDE.md` for detailed setup, deployment, and troubleshooting.

---

**Questions? Check the README files in each directory!**
