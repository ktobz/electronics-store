# 🚀 Electronics Store Backend Setup Guide

## 📋 Overview
This guide will help you set up a modern, full-stack Node.js backend with MongoDB database for the Electronics Store application.

## 🛠️ Technologies Used
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **TypeScript** - Type safety

## 📁 Project Structure
```
electronics-store/
├── server.js                 # Main backend server
├── .env                     # Environment variables
├── package.json              # Dependencies and scripts
├── src/
│   ├── services/
│   │   ├── api.ts          # API service layer
│   │   └── mockApi.ts      # Legacy mock API
│   └── context/
│       └── StoreContext.tsx  # Global state management
```

## 🗄️ Database Setup

### Option 1: Local MongoDB (Development)
1. **Install MongoDB**:
   ```bash
   # Windows
   # Download and install from https://www.mongodb.com/try/download/community
   
   # macOS (using Homebrew)
   brew tap mongodb/brew
   brew install mongodb-community
   
   # Linux (Ubuntu)
   sudo apt-get install mongodb
   ```

2. **Start MongoDB Service**:
   ```bash
   # Windows
   net start MongoDB
   
   # macOS/Linux
   sudo systemctl start mongod
   ```

3. **Verify Connection**:
   ```bash
   mongosh
   # Should connect successfully
   ```

### Option 2: MongoDB Atlas (Cloud)
1. **Create Account**: https://www.mongodb.com/atlas
2. **Create Cluster**: Free tier (M0)
3. **Get Connection String**: 
   - Click "Connect" → "Connect your application"
   - Copy the connection string
4. **Update .env**:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/electronics-store?retryWrites=true&w=majority
   ```

## 🔧 Installation & Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Create/Update `.env` file:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/electronics-store

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Frontend Configuration
REACT_APP_API_URL=http://localhost:5000/api
```

### 3. Start Backend Server
```bash
npm run server
```

**Expected Output**:
```
🚀 Server running on http://localhost:5000
📊 MongoDB connected
🔐 JWT authentication enabled
🛍️  E-commerce API ready
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Products
- `GET /api/products` - Get all products (with pagination, filtering, search)
- `GET /api/products/:id` - Get single product

### Users (Protected)
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/wishlist` - Add to wishlist
- `PUT /api/user/cart` - Add to cart
- `GET /api/user/cart` - Get cart items
- `DELETE /api/user/cart/:id` - Remove from cart

### Blogs
- `GET /api/blogs` - Get all blogs
- `GET /api/blogs/:slug` - Get single blog

## 🔐 Authentication Flow

### 1. User Registration
```javascript
const userData = {
    firstName: "John",
    lastName: "Doe", 
    email: "john@example.com",
    password: "securePassword123",
    phone: "+1234567890"
};

const response = await authAPI.register(userData);
// Returns: { token, user }
```

### 2. User Login
```javascript
const credentials = {
    email: "john@example.com",
    password: "securePassword123"
};

const response = await authAPI.login(credentials);
// Returns: { token, user }
```

### 3. Token Storage
```javascript
// Store in localStorage
localStorage.setItem('token', response.token);
localStorage.setItem('user', JSON.stringify(response.user));
```

## 🛒 Shopping Cart Features

### Add to Cart
```javascript
await userAPI.addToCart(productId, quantity);
// Updates cart in database
// Refreshes local cart state
```

### Wishlist Management
```javascript
await userAPI.toggleWishlist(productId);
// Toggles product in wishlist
// Syncs with backend
```

## 🎨 Modern Features Implemented

### ✅ User Management
- **Secure Authentication** with JWT tokens
- **Password Hashing** with bcrypt
- **Profile Management** with real-time updates
- **Avatar Generation** with UI-Avatars

### ✅ Shopping Experience  
- **Real-time Cart** synchronization
- **Wishlist Management** with backend persistence
- **Product Comparison** (up to 4 items)
- **Order History** and tracking

### ✅ Data Management
- **MongoDB Integration** with Mongoose ODM
- **RESTful API** design
- **Error Handling** and validation
- **CORS Support** for frontend integration

### ✅ Security Features
- **JWT Authentication** with expiration
- **Password Encryption** with bcrypt
- **Request Interceptors** for token management
- **Protected Routes** for user data

## 🚀 Production Deployment

### 1. Environment Setup
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/electronics-store
JWT_SECRET=super-secure-production-secret
REACT_APP_API_URL=https://your-domain.com/api
```

### 2. Build & Deploy
```bash
# Build frontend
npm run build

# Deploy to hosting (Netlify, Vercel, etc.)
# Start backend server (PM2, Docker, etc.)
npm start
```

## 🔍 Testing the API

### Test Registration
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User", 
    "email": "test@example.com",
    "password": "test123"
  }'
```

### Test Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123"
  }'
```

### Get Products
```bash
curl http://localhost:5000/api/products?page=1&limit=10
```

## 🎯 Next Steps

1. **Start MongoDB** service locally or use MongoDB Atlas
2. **Run backend server**: `npm run server`
3. **Start frontend**: `npm run dev`
4. **Test integration** between frontend and backend
5. **Deploy to production** with proper environment variables

## 🌟 Benefits

### Modern Architecture
- **Scalable** Node.js backend
- **Flexible** MongoDB database
- **Secure** JWT authentication
- **Type-safe** TypeScript implementation
- **RESTful** API design

### Premium Features
- **Real-time** data synchronization
- **Professional** user management
- **Advanced** shopping cart features
- **Enterprise-level** security

### Developer Experience
- **Hot reload** development
- **Comprehensive** error handling
- **Modern** async/await patterns
- **Clean** code organization

🎉 **Your Electronics Store is now a modern, full-stack application with professional backend integration!**
