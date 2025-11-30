# SalesIQ App Deployment Guide

## 🚀 Production URLs
- **Frontend**: https://salesiq-app.vercel.app
- **Backend**: https://salesiq-app.onrender.com
- **MongoDB Atlas**: Connected to ClusterDhina

## 📋 Environment Configuration

### Backend (.env)
```bash
# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://dinesh57399_db_user:kL4VZYXBcSeatfFM@clusterdhina.ozsnsei.mongodb.net/?appName=ClusterDhina

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d

# Server Configuration
PORT=5000
NODE_ENV=production

# Frontend URLs
FRONTEND_URL=https://salesiq-app.vercel.app
ALLOWED_ORIGINS=https://salesiq-app.vercel.app,http://localhost:5173
```

### Frontend (.env)
```bash
# Backend API URL
VITE_API_URL=https://salesiq-app.onrender.com

# Other environment variables
VITE_APP_NAME=SalesIQ Clone
VITE_APP_VERSION=1.0.0
```

## 🔧 Deployment Steps

### 1. Backend Deployment (Render)
1. Push your backend code to GitHub
2. Connect your GitHub repository to Render
3. Set environment variables in Render dashboard
4. Deploy automatically on push to main branch

### 2. Frontend Deployment (Vercel)
1. Push your frontend code to GitHub
2. Connect your GitHub repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push to main branch

## 📦 Build Commands

### Frontend
```bash
# Install dependencies
npm install

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to Vercel
npm run deploy:vercel
```

### Backend
```bash
# Install dependencies
npm install

# Start production server
npm start
```

## 🔍 Testing

### Local Testing
```bash
# Frontend (http://localhost:5173)
npm run dev

# Backend (http://localhost:5000)
npm run dev
```

### Production Testing
- Frontend: https://salesiq-app.vercel.app
- Backend Health: https://salesiq-app.onrender.com/api/health

## 🛠️ Troubleshooting

### Common Issues
1. **CORS Errors**: Update CORS origins in server.js
2. **MongoDB Connection**: Check Atlas IP whitelist and credentials
3. **Environment Variables**: Ensure all required variables are set
4. **Build Errors**: Check for missing dependencies or syntax errors

### Debug Steps
1. Check browser console for frontend errors
2. Check Render logs for backend errors
3. Verify MongoDB Atlas connection
4. Test API endpoints individually

## 📊 Monitoring

### Backend Health Check
```bash
curl https://salesiq-app.onrender.com/api/health
```

### Frontend Build Status
Check Vercel dashboard for deployment status and build logs.

## 🔄 Updates

To update the application:
1. Make changes to code
2. Test locally
3. Push to GitHub
4. Automatic deployment triggers
5. Verify production deployment

## 🔐 Security Notes

- Keep JWT secret secure and unique
- Use environment variables for sensitive data
- Regularly update dependencies
- Monitor for security vulnerabilities
- Use HTTPS in production
