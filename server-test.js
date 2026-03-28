const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test endpoints
app.get('/', (req, res) => {
    res.json({
        message: 'Electronics Store API Server',
        status: 'Running',
        endpoints: {
            auth: '/api/auth',
            products: '/api/products',
            users: '/api/user',
            blogs: '/api/blogs'
        }
    });
});

// Mock products for testing
app.get('/api/products', (req, res) => {
    const mockProducts = [
        {
            _id: '1',
            name: 'iPhone 15 Pro',
            description: 'Latest iPhone with advanced features',
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
            _id: '2',
            name: 'MacBook Pro M3',
            description: 'Professional laptop with M3 chip',
            price: 1999.99,
            category: 'laptops',
            brand: 'Apple',
            image: 'https://picsum.photos/seed/macbook/400/300.jpg',
            rating: 4.8,
            reviews: 189,
            inStock: true,
            featured: true,
            tags: ['laptop', 'apple', 'professional']
        }
    ];

    res.json({
        products: mockProducts,
        pagination: {
            currentPage: 1,
            totalPages: 1,
            totalProducts: mockProducts.length
        }
    });
});

app.get('/api/products/:id', (req, res) => {
    const product = {
        _id: req.params.id,
        name: 'iPhone 15 Pro',
        description: 'Latest iPhone with advanced features and titanium design',
        price: 999.99,
        originalPrice: 1099.99,
        category: 'smartphones',
        brand: 'Apple',
        image: 'https://picsum.photos/seed/iphone15/400/300.jpg',
        images: [
            'https://picsum.photos/seed/iphone15-1/400/300.jpg',
            'https://picsum.photos/seed/iphone15-2/400/300.jpg',
            'https://picsum.photos/seed/iphone15-3/400/300.jpg'
        ],
        rating: 4.9,
        reviews: 245,
        inStock: true,
        featured: true,
        specifications: {
            display: '6.1-inch Super Retina XDR',
            processor: 'A17 Pro chip',
            camera: '48MP Main camera',
            battery: 'All-day battery life',
            storage: '128GB, 256GB, 512GB, 1TB'
        },
        tags: ['smartphone', 'apple', 'premium', 'titanium']
    };
    res.json(product);
});

// Mock auth endpoints
app.post('/api/auth/register', (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    
    // Mock response
    res.status(201).json({
        message: 'User registered successfully',
        token: 'mock-jwt-token-' + Date.now(),
        user: {
            id: 'user-' + Date.now(),
            firstName,
            lastName,
            email,
            avatar: `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random`,
            role: 'user'
        }
    });
});

app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    
    // Mock response
    res.json({
        message: 'Login successful',
        token: 'mock-jwt-token-' + Date.now(),
        user: {
            id: 'user-123',
            firstName: 'John',
            lastName: 'Doe',
            email,
            avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=random',
            role: 'user'
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Test Server running on http://localhost:${PORT}`);
    console.log(`📊 Ready for API testing`);
});
