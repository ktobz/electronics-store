# 🗄️ Database Setup Guide for Electronics Store

## 🚀 Quick Start Options

### Option 1: MongoDB (Recommended)
Perfect for e-commerce with flexible product schemas and scalability.

### Option 2: MongoDB Atlas (Cloud)
Easy cloud setup, no installation required.

### Option 3: Supabase (PostgreSQL)
Great for user authentication and structured data.

---

## 📦 MongoDB Setup

### Windows Installation
1. **Download MongoDB Community Server**
   - Go to: https://www.mongodb.com/try/download/community
   - Select Windows version
   - Download and run the installer

2. **Install MongoDB**
   - Choose "Complete" installation
   - Install MongoDB Compass (GUI tool)
   - Keep default settings

3. **Start MongoDB Service**
   ```cmd
   # Open Command Prompt as Administrator
   net start MongoDB
   ```

4. **Verify Installation**
   ```cmd
   # Open MongoDB Shell
   mongosh
   # You should see: mongosh>
   ```

### macOS Installation
```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

### Linux Installation (Ubuntu)
```bash
# Import MongoDB public key
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Install MongoDB
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

---

## ☁️ MongoDB Atlas (Cloud Option)

### 1. Create Account
- Go to: https://www.mongodb.com/atlas
- Sign up for free account

### 2. Create Cluster
- Click "Create Cluster"
- Choose "M0 Sandbox" (FREE)
- Select cloud provider and region
- Cluster name: `electronics-store`

### 3. Get Connection String
- Click "Connect" → "Connect your application"
- Choose "Node.js" driver
- Copy the connection string
- Example: `mongodb+srv://username:password@cluster.mongodb.net/electronics-store`

### 4. Update .env file
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/electronics-store?retryWrites=true&w=majority
```

---

## 🐘 PostgreSQL with Supabase (Alternative)

### 1. Create Supabase Project
- Go to: https://supabase.com
- Click "Start your project"
- Sign in with GitHub
- Create new project: `electronics-store`

### 2. Get Database Credentials
- Go to Settings → Database
- Copy connection string
- Update your .env file

---

## 🛠️ Database Schema Setup

### MongoDB Collections
```javascript
// Users Collection
{
  _id: ObjectId,
  firstName: String,
  lastName: String,
  email: String,
  password: String, // Hashed
  avatar: String,
  role: String,
  cart: [{ product: ObjectId, quantity: Number }],
  wishlist: [ObjectId],
  orders: [ObjectId],
  points: Number,
  createdAt: Date,
  updatedAt: Date
}

// Products Collection
{
  _id: ObjectId,
  name: String,
  description: String,
  price: Number,
  originalPrice: Number,
  category: String,
  brand: String,
  image: String,
  images: [String],
  rating: Number,
  reviews: Number,
  inStock: Boolean,
  featured: Boolean,
  specifications: Object,
  tags: [String],
  createdAt: Date,
  updatedAt: Date
}

// Orders Collection
{
  _id: ObjectId,
  userId: ObjectId,
  items: [{ product: ObjectId, quantity: Number, price: Number }],
  total: Number,
  status: String,
  shippingAddress: Object,
  paymentMethod: String,
  createdAt: Date
}

// Blogs Collection
{
  _id: ObjectId,
  title: String,
  slug: String,
  content: String,
  excerpt: String,
  author: String,
  authorAvatar: String,
  category: String,
  tags: [String],
  featured: Boolean,
  image: String,
  readTime: Number,
  likes: Number,
  views: Number,
  publishedAt: Date
}
```

---

## 🔧 Setup Your Database

### Step 1: Choose Your Database Option
- **Local MongoDB**: Best for development
- **MongoDB Atlas**: Best for production
- **Supabase**: Best for user authentication

### Step 2: Update .env File
```env
# For Local MongoDB
MONGODB_URI=mongodb://localhost:27017/electronics-store

# For MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/electronics-store?retryWrites=true&w=majority

# For Supabase
REACT_APP_SUPABASE_URL=your-supabase-url
REACT_APP_SUPABASE_ANON_KEY=your-supabase-key
```

### Step 3: Start Your Backend
```bash
npm run server
```

### Step 4: Test Database Connection
- Your backend will automatically connect
- Check console for "MongoDB connected" message
- Products will be loaded from database

---

## 🚀 Quick Setup Commands

### MongoDB (Local)
```bash
# Install MongoDB
# Windows: Download from mongodb.com
# macOS: brew install mongodb-community
# Linux: sudo apt-get install mongodb

# Start MongoDB
# Windows: net start MongoDB
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod

# Create Database
mongosh
use electronics-store
```

### MongoDB Atlas (Cloud)
```bash
# 1. Go to https://cloud.mongodb.com
# 2. Create free account
# 3. Create M0 Sandbox cluster
# 4. Get connection string
# 5. Update .env file
```

### Supabase (PostgreSQL)
```bash
# 1. Go to https://supabase.com
# 2. Create new project
# 3. Get database URL
# 4. Update .env file
```

---

## ✅ Verification

### Test Your Database Connection
```bash
# Start backend server
npm run server

# Look for this message:
# "📊 MongoDB connected" or "Database connected successfully"
```

### Test with Frontend
```bash
# Start frontend
npm run dev

# Navigate to: http://localhost:5173
# Try searching for products
# Try user registration/login
```

---

## 🎯 Recommended Setup

### For Development
- **Local MongoDB** - Fast, free, no internet required
- **Supabase Auth** - User authentication
- **MongoDB for products, users, orders**

### For Production
- **MongoDB Atlas** - Scalable, reliable
- **Supabase Auth** - Secure authentication
- **Cloud deployment** - 24/7 availability

---

## 🛟 Troubleshooting

### MongoDB Connection Issues
```bash
# Check if MongoDB is running
mongosh --eval "db.adminCommand('ismaster')"

# Restart MongoDB
# Windows: net stop MongoDB && net start MongoDB
# macOS: brew services restart mongodb-community
# Linux: sudo systemctl restart mongod
```

### Port Issues
```bash
# Check if port 27017 is in use
netstat -an | grep 27017

# Kill process using the port
sudo kill -9 <PID>
```

### Authentication Issues
- Check .env file for correct credentials
- Verify database user has proper permissions
- Ensure firewall allows database connection

---

## 📞 Need Help?

1. **MongoDB Docs**: https://docs.mongodb.com
2. **MongoDB Atlas**: https://cloud.mongodb.com
3. **Supabase Docs**: https://supabase.com/docs
4. **Community Forums**: Stack Overflow, GitHub Discussions

Choose the option that best fits your needs and follow the setup instructions!
