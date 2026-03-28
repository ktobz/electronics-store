const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

// API Routes
app.get('/api', (req, res) => {
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

// Mock products data
const mockProducts = [
    {
        _id: '1',
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
        _id: '2',
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
        _id: '3',
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
        _id: '4',
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
        _id: '5',
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

// Routes
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

// Auth endpoints
app.post('/api/auth/register', (req, res) => {
    const { firstName, lastName, email, password, phone } = req.body;
    
    res.status(201).json({
        message: 'User registered successfully',
        token: 'mock-jwt-token-' + Date.now(),
        user: {
            id: 'user-' + Date.now(),
            firstName,
            lastName,
            email,
            phone,
            avatar: `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random`,
            role: 'user'
        }
    });
});

app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    
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

// Product endpoints
app.get('/api/products', (req, res) => {
    const { page = 1, limit = 20, category, brand, search, sortBy = 'name', sortOrder = 'asc' } = req.query;
    
    let filteredProducts = [...mockProducts];
    
    // Apply filters
    if (category) {
        filteredProducts = filteredProducts.filter(p => p.category === category);
    }
    if (brand) {
        filteredProducts = filteredProducts.filter(p => p.brand.toLowerCase() === brand.toLowerCase());
    }
    if (search) {
        filteredProducts = filteredProducts.filter(p => 
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.description.toLowerCase().includes(search.toLowerCase()) ||
            p.brand.toLowerCase().includes(search.toLowerCase())
        );
    }
    
    // Apply sorting
    filteredProducts.sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];
        
        if (sortOrder === 'desc') {
            return bValue > aValue ? 1 : -1;
        }
        return aValue > bValue ? 1 : -1;
    });
    
    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
    
    res.json({
        products: paginatedProducts,
        pagination: {
            currentPage: parseInt(page),
            totalPages: Math.ceil(filteredProducts.length / limit),
            totalProducts: filteredProducts.length,
            hasNext: endIndex < filteredProducts.length,
            hasPrev: page > 1
        }
    });
});

app.get('/api/products/:id', (req, res) => {
    const product = mockProducts.find(p => p._id === req.params.id);
    
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
    
    const detailedProduct = {
        ...product,
        images: [
            product.image,
            `https://picsum.photos/seed/${product.name}-1/400/300.jpg`,
            `https://picsum.photos/seed/${product.name}-2/400/300.jpg`,
            `https://picsum.photos/seed/${product.name}-3/400/300.jpg`
        ],
        specifications: {
            display: product.category === 'smartphones' ? '6.1-inch Super Retina XDR' : 
                     product.category === 'laptops' ? '14-inch Liquid Retina XDR' :
                     product.category === 'tablets' ? '12.9-inch Liquid Retina XDR' :
                     product.category === 'audio' ? '40mm drivers' : 'Standard display',
            processor: product.brand === 'Apple' ? 'A17 Pro chip' : 
                       product.brand === 'Samsung' ? 'Snapdragon 8 Gen 3' :
                       product.brand === 'Sony' ? 'Custom processor' : 'Standard processor',
            camera: product.category === 'smartphones' ? '48MP Main camera' :
                   product.category === 'tablets' ? '12MP Wide camera' : 'No camera',
            battery: 'All-day battery life',
            storage: '128GB, 256GB, 512GB, 1TB',
            connectivity: '5G, Wi-Fi 6, Bluetooth 5.3'
        }
    };
    
    res.json(detailedProduct);
});

// User endpoints
app.get('/api/user/profile', (req, res) => {
    res.json({
        id: 'user-123',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=random',
        role: 'user',
        wishlist: ['1', '2'],
        cart: [
            { product: '1', quantity: 1 },
            { product: '3', quantity: 2 }
        ],
        orders: []
    });
});

app.put('/api/user/wishlist', (req, res) => {
    const { productId } = req.body;
    res.json({ message: 'Product added to wishlist' });
});

app.put('/api/user/cart', (req, res) => {
    const { productId, quantity = 1 } = req.body;
    res.json({ message: 'Product added to cart' });
});

// Blog endpoints
app.get('/api/blogs', (req, res) => {
    const mockBlogs = [
        {
            _id: '1',
            title: 'iPhone 15 Pro Review: The New Standard',
            slug: 'iphone-15-pro-review',
            content: 'The iPhone 15 Pro represents a significant leap forward in smartphone technology...',
            excerpt: 'Apple\'s latest flagship sets new standards for mobile photography',
            author: 'Tech Expert',
            authorAvatar: 'https://ui-avatars.com/api/?name=Tech+Expert&background=random',
            category: 'Reviews',
            tags: ['iphone', 'apple', 'review', 'smartphone'],
            featured: true,
            image: 'https://picsum.photos/seed/iphone15review/800/400.jpg',
            readTime: 5,
            likes: 245,
            views: 1520,
            publishedAt: new Date().toISOString()
        },
        {
            _id: '2',
            title: 'Best Laptops for Professionals 2024',
            slug: 'best-laptops-2024',
            content: 'Choosing the right laptop for professional work can be challenging...',
            excerpt: 'Comprehensive guide to the best professional laptops',
            author: 'Pro Reviewer',
            authorAvatar: 'https://ui-avatars.com/api/?name=Pro+Reviewer&background=random',
            category: 'Guides',
            tags: ['laptops', 'professional', 'guide', '2024'],
            featured: false,
            image: 'https://picsum.photos/seed/laptops2024/800/400.jpg',
            readTime: 8,
            likes: 189,
            views: 892,
            publishedAt: new Date().toISOString()
        }
    ];
    
    res.json({
        blogs: mockBlogs,
        pagination: {
            currentPage: 1,
            totalPages: 1,
            totalBlogs: mockBlogs.length
        }
    });
});

app.get('/api/blogs/:slug', (req, res) => {
    const blog = {
        _id: '1',
        title: 'iPhone 15 Pro Review: The New Standard',
        slug: req.params.slug,
        content: `The iPhone 15 Pro represents a significant leap forward in smartphone technology. With its titanium construction, A17 Pro chip, and advanced camera system, it sets new standards for what a premium smartphone can offer.

## Design and Build Quality

The iPhone 15 Pro features a stunning titanium frame that makes it both lighter and stronger than previous models. The contoured edges and matte finish give it a premium feel that's immediately apparent when you pick it up.

## Performance

Powered by the A17 Pro chip, the iPhone 15 Pro delivers desktop-class performance in a pocket-sized device. Apps launch instantly, games run smoothly at high frame rates, and multitasking is seamless.

## Camera System

The 48MP main camera captures stunning detail and color accuracy. The new computational photography features produce professional-quality photos in virtually any lighting condition.

## Battery Life

With improved efficiency and a larger battery, the iPhone 15 Pro easily lasts all day even with heavy use.

## Conclusion

The iPhone 15 Pro is an exceptional device that pushes the boundaries of what's possible in a smartphone. It's the perfect choice for users who demand the best.`,
        excerpt: 'Apple\'s latest flagship sets new standards for mobile photography',
        author: 'Tech Expert',
        authorAvatar: 'https://ui-avatars.com/api/?name=Tech+Expert&background=random',
        category: 'Reviews',
        tags: ['iphone', 'apple', 'review', 'smartphone'],
        featured: true,
        image: 'https://picsum.photos/seed/iphone15review/800/400.jpg',
        readTime: 5,
        likes: 245,
        views: 1521,
        publishedAt: new Date().toISOString()
    };
    
    res.json(blog);
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 API endpoints ready`);
    console.log(`🛍️  Mock data loaded`);
    console.log(`🔧 Test endpoints available`);
});
