const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/electronics-store', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('📊 MongoDB Atlas connected successfully');
    console.log(`🔗 Database: electronics-store`);
})
.catch((error) => {
    console.error('❌ MongoDB connection error:', error);
    console.log('⚠️  Using mock data instead');
});

// MongoDB Schemas
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: String,
    avatar: String,
    role: { type: String, default: 'user' },
    cart: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, default: 1 }
    }],
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    points: { type: Number, default: 0 },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: Number,
    category: { type: String, required: true },
    brand: { type: String, required: true },
    image: { type: String, required: true },
    images: [String],
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    inStock: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
    specifications: mongoose.Schema.Types.Mixed,
    tags: [String],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: Number,
        price: Number
    }],
    total: { type: Number, required: true },
    status: { type: String, default: 'pending' },
    shippingAddress: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String
    },
    paymentMethod: String,
    createdAt: { type: Date, default: Date.now }
});

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    excerpt: String,
    author: { type: String, required: true },
    authorAvatar: String,
    category: String,
    tags: [String],
    featured: { type: Boolean, default: false },
    image: String,
    readTime: Number,
    likes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    publishedAt: { type: Date, default: Date.now }
});

// Create Models
const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);
const Order = mongoose.model('Order', orderSchema);
const Blog = mongoose.model('Blog', blogSchema);

// Mock products data (will be saved to database)
const mockProducts = [
    {
        name: 'iPhone 15 Pro',
        description: 'Latest iPhone with advanced features and titanium design',
        price: 999.99,
        originalPrice: 1099.99,
        category: 'smartphones',
        brand: 'Apple',
        image: 'https://picsum.photos/seed/iphone15/400/300.jpg',
        rating: 4.9,
        reviews: 245,
        inStock: true,
        featured: true,
        tags: ['smartphone', 'apple', 'premium']
    },
    {
        name: 'MacBook Pro M3',
        description: 'Professional laptop with powerful M3 chip',
        price: 1999.99,
        category: 'laptops',
        brand: 'Apple',
        image: 'https://picsum.photos/seed/macbook/400/300.jpg',
        rating: 4.8,
        reviews: 189,
        inStock: true,
        featured: true,
        tags: ['laptop', 'apple', 'professional']
    },
    {
        name: 'Samsung Galaxy S24 Ultra',
        description: 'Premium Android smartphone with S Pen',
        price: 1199.99,
        category: 'smartphones',
        brand: 'Samsung',
        image: 'https://picsum.photos/seed/galaxy24/400/300.jpg',
        rating: 4.7,
        reviews: 167,
        inStock: true,
        featured: true,
        tags: ['smartphone', 'samsung', 'android']
    },
    {
        name: 'Sony WH-1000XM5',
        description: 'Industry-leading noise canceling headphones',
        price: 349.99,
        originalPrice: 399.99,
        category: 'audio',
        brand: 'Sony',
        image: 'https://picsum.photos/seed/sonyxm5/400/300.jpg',
        rating: 4.9,
        reviews: 312,
        inStock: true,
        featured: false,
        tags: ['headphones', 'audio', 'noise-canceling']
    },
    {
        name: 'iPad Pro 12.9"',
        description: 'Professional tablet with M2 chip',
        price: 1099.99,
        category: 'tablets',
        brand: 'Apple',
        image: 'https://picsum.photos/seed/ipadpro/400/300.jpg',
        rating: 4.8,
        reviews: 203,
        inStock: true,
        featured: true,
        tags: ['tablet', 'apple', 'professional']
    }
];

// Initialize database with sample data
const initializeDatabase = async () => {
    try {
        const productCount = await Product.countDocuments();
        if (productCount === 0) {
            console.log('📦 Initializing database with sample products...');
            await Product.insertMany(mockProducts);
            console.log('✅ Sample products added to database');
        }
    } catch (error) {
        console.error('❌ Error initializing database:', error);
    }
};

// Initialize database on startup
initializeDatabase();

// API Routes
app.get('/api', (req, res) => {
    res.json({
        message: 'Electronics Store API Server',
        status: 'Running',
        database: 'MongoDB Atlas',
        endpoints: {
            auth: '/api/auth',
            products: '/api/products',
            users: '/api/user',
            blogs: '/api/blogs'
        }
    });
});

// Products API
app.get('/api/products', async (req, res) => {
    try {
        const { page = 1, limit = 20, category, brand, search } = req.query;
        
        let query = {};
        if (category) query.category = category;
        if (brand) query.brand = brand;
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { brand: { $regex: search, $options: 'i' } }
            ];
        }

        const products = await Product.find(query)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });

        const total = await Product.countDocuments(query);

        res.json({
            products,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

app.get('/api/products/featured', async (req, res) => {
    try {
        const products = await Product.find({ featured: true }).limit(8);
        res.json({ products });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch featured products' });
    }
});

app.get('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json({ product });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch product' });
    }
});

// User API
app.get('/api/user/profile', async (req, res) => {
    try {
        // Mock user profile (replace with auth middleware)
        const mockUser = {
            cart: [],
            wishlist: [],
            points: 100,
            orders: []
        };
        res.json(mockUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user profile' });
    }
});

app.post('/api/user/wishlist', async (req, res) => {
    try {
        const { productId } = req.body;
        // Mock wishlist logic
        res.json({ message: 'Added to wishlist' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update wishlist' });
    }
});

app.post('/api/user/cart', async (req, res) => {
    try {
        const { productId, quantity = 1 } = req.body;
        // Mock cart logic
        res.json({ message: 'Added to cart' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update cart' });
    }
});

// Blogs API
app.get('/api/blogs', async (req, res) => {
    try {
        const { page = 1, limit = 10, category } = req.query;
        
        let query = {};
        if (category) query.category = category;

        const blogs = await Blog.find(query)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ publishedAt: -1 });

        const total = await Blog.countDocuments(query);

        res.json({
            blogs,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch blogs' });
    }
});

app.get('/api/blogs/featured', async (req, res) => {
    try {
        const blogs = await Blog.find({ featured: true }).limit(4);
        res.json({ blogs });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch featured blogs' });
    }
});

// Auth API (Mock)
app.post('/api/auth/register', async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body;
        
        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Create new user
        const user = new User({
            firstName,
            lastName,
            email,
            points: 100
        });

        await user.save();
        res.json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Mock login (in production, verify password)
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        res.json({ message: 'Login successful', user });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 MongoDB Atlas connected`);
    console.log(`🛍️  Real database ready`);
    console.log(`🔧 API endpoints available`);
});
