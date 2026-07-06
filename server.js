const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

let pid = 1;
const p = (name, brand, price, origPrice, rating, reviews, category, desc, image, tags, featured, inStock) => ({
  _id: `prod_${pid++}`,
  name, brand, price, originalPrice: origPrice, rating, reviews,
  image: image || `https://picsum.photos/seed/${name.replace(/\s+/g,'').toLowerCase()}/400/300.jpg`,
  category, description: desc || `${name} by ${brand}.`, inStock: inStock !== false,
  featured: !!featured, tags: tags || [category, brand],
  images: [image || `https://picsum.photos/seed/${name.replace(/\s+/g,'').toLowerCase()}/400/300.jpg`],
  createdAt: new Date(), updatedAt: new Date()
});

const mockProducts = [
  p("iPhone 15 Pro","Apple",999.99,1099.99,4.9,342,"smartphones","Latest iPhone with titanium design.",null,["smartphones","Apple","iOS"],true,true),
  p("Galaxy S24 Ultra","Samsung",1199.99,null,4.8,298,"smartphones","Premium Android with S Pen.",null,["smartphones","Samsung","Android"],true,true),
  p("Pixel 8 Pro","Google",899.99,999.99,4.7,189,"smartphones","Google's AI-powered flagship.",null,["smartphones","Google","Android"],true,true),
  p("OnePlus 12","OnePlus",799.99,null,4.6,145,"smartphones","Speed and performance redefined.",null,["smartphones","OnePlus","Android"],false,true),
  p("iPhone 16 Pro Max","Apple",1199.99,null,4.9,512,"smartphones","The most powerful iPhone yet.",null,["smartphones","Apple","iOS"],true,true),
  p("Nothing Phone 2","Nothing",699.99,null,4.5,112,"smartphones","Iconic Glyph Interface.",null,["smartphones","Nothing","Android"],false,true),
  p("MacBook Pro M3","Apple",1999.99,2199.99,4.9,456,"laptops","Powerful laptop with M3 chip.",null,["laptops","Apple","macOS"],true,true),
  p("Dell XPS 15","Dell",1899.99,null,4.8,234,"laptops","Premium ultrabook with stunning display.",null,["laptops","Dell","Windows"],true,true),
  p("ThinkPad X1 Carbon","Lenovo",1499.99,null,4.7,189,"laptops","Business-class durability.",null,["laptops","Lenovo","Windows"],false,true),
  p("Galaxy Book 4 Pro","Samsung",1399.99,null,4.6,112,"laptops","Ultra-thin Samsung laptop.",null,["laptops","Samsung","Windows"],false,true),
  p("Surface Laptop Studio","Microsoft",1799.99,1999.99,4.7,178,"laptops","Versatile creative workstation.",null,["laptops","Microsoft","Windows"],true,true),
  p("ROG Zephyrus G14","ASUS",1599.99,null,4.8,289,"laptops","Compact gaming powerhouse.",null,["laptops","ASUS","Windows","gaming"],false,true),
  p("WH-1000XM5","Sony",349.99,399.99,4.9,567,"audio","Industry-leading ANC headphones.",null,["audio","Sony","Headphones"],true,true),
  p("AirPods Pro 2","Apple",249.99,null,4.8,423,"audio","Adaptive audio earbuds.",null,["audio","Apple","Earbuds"],true,true),
  p("Bose QuietComfort Ultra","Bose",429.99,null,4.9,312,"audio","Immersive spatial audio.",null,["audio","Bose","Headphones"],true,true),
  p("Galaxy Buds 3 Pro","Samsung",229.99,null,4.6,187,"audio","AI-powered ANC earbuds.",null,["audio","Samsung","Earbuds"],false,true),
  p("Marshall Major V","Marshall",149.99,null,4.5,98,"audio","Classic rock-inspired sound.",null,["audio","Marshall","Headphones"],false,true),
  p("JBL Charge 5","JBL",179.99,null,4.7,234,"audio","Portable waterproof speaker.",null,["audio","JBL","Speaker"],false,true),
  p("PlayStation 5","Sony",499.99,null,4.8,678,"gaming","Next-gen gaming console.",null,["gaming","Sony","Console"],true,true),
  p("Xbox Series X","Microsoft",499.99,null,4.8,567,"gaming","Most powerful Xbox ever.",null,["gaming","Microsoft","Console"],true,true),
  p("Nintendo Switch OLED","Nintendo",349.99,null,4.7,445,"gaming","Versatile hybrid console.",null,["gaming","Nintendo","Console"],true,true),
  p("Steam Deck OLED","Valve",549.99,null,4.7,312,"gaming","PC gaming on the go.",null,["gaming","Valve","Handheld"],false,true),
  p("ROG Ally X","ASUS",699.99,799.99,4.6,189,"gaming","Windows handheld gaming.",null,["gaming","ASUS","Handheld"],false,true),
  p("Meta Quest 3","Meta",499.99,null,4.5,267,"gaming","Mixed reality headset.",null,["gaming","Meta","VR"],false,true),
  p("Apple Watch Ultra 2","Apple",799.99,null,4.9,389,"wearables","Ultimate adventure watch.",null,["wearables","Apple","Watch"],true,true),
  p("Galaxy Watch 7","Samsung",329.99,null,4.7,245,"wearables","Advanced health tracking.",null,["wearables","Samsung","Watch"],true,true),
  p("Fitbit Charge 6","Fitbit",159.99,null,4.5,178,"wearables","Fitness tracker with Google.",null,["wearables","Fitbit","Tracker"],false,true),
  p("Garmin Fenix 7 Pro","Garmin",799.99,null,4.8,198,"wearables","Premium multisport GPS watch.",null,["wearables","Garmin","Watch"],false,true),
  p("iPad Pro M4","Apple",1099.99,1299.99,4.9,378,"tablets","M4 chip tablet powerhouse.",null,["tablets","Apple","iPad"],true,true),
  p("Galaxy Tab S9 Ultra","Samsung",1199.99,null,4.8,234,"tablets","Massive AMOLED display.",null,["tablets","Samsung","Android"],true,true),
  p("Surface Pro 10","Microsoft",999.99,null,4.7,189,"tablets","2-in-1 tablet and laptop.",null,["tablets","Microsoft","Windows"],false,true),
  p("Kindle Scribe","Amazon",339.99,null,4.6,145,"tablets","E-reader and notebook.",null,["tablets","Amazon","eReader"],false,true),
  p("Sony A7R V","Sony",3899.99,null,4.9,234,"cameras","61MP full-frame powerhouse.",null,["cameras","Sony","Mirrorless"],true,true),
  p("Canon EOS R5","Canon",3499.99,3899.99,4.8,198,"cameras","8K video mirrorless camera.",null,["cameras","Canon","Mirrorless"],true,true),
  p("Nikon Z8","Nikon",3799.99,null,4.8,167,"cameras","Professional hybrid camera.",null,["cameras","Nikon","Mirrorless"],false,true),
  p("GoPro Hero 13","GoPro",399.99,null,4.6,312,"cameras","Action camera for adventure.",null,["cameras","GoPro","Action"],false,true),
  p("DJI Osmo Pocket 3","DJI",519.99,null,4.7,198,"cameras","Compact gimbal camera.",null,["cameras","DJI","Action"],false,true),
  p("LG OLED C3 65\"","LG",1499.99,1799.99,4.8,345,"tvs","Stunning OLED picture quality.",null,["tvs","LG","OLED"],true,true),
  p("Samsung QLED 8K","Samsung",2999.99,null,4.9,234,"tvs","8K resolution smart TV.",null,["tvs","Samsung","QLED"],true,true),
  p("Sony Bravia XR A95L","Sony",2499.99,null,4.9,189,"tvs","QD-OLED flagship TV.",null,["tvs","Sony","OLED"],false,true),
  p("TCL QM8 75\"","TCL",1199.99,null,4.5,123,"tvs","Mini-LED value pick.",null,["tvs","TCL","Mini-LED"],false,true),
  p("Bose Smart Soundbar 900","Bose",899.99,null,4.7,178,"audio","Dolby Atmos soundbar.",null,["audio","Bose","Soundbar"],false,true),
  p("Sonos Arc","Sonos",899.99,null,4.8,256,"audio","Premium smart soundbar.",null,["audio","Sonos","Soundbar"],false,true),
  p("Roomba j9+ Combo","iRobot",1399.99,null,4.6,167,"smart-home","Vacuum and mop robot.",null,["smart-home","iRobot","Robot"],false,true),
  p("Google Nest Hub Max","Google",229.99,null,4.5,198,"smart-home","Smart display with camera.",null,["smart-home","Google","Display"],false,true),
  p("Amazon Echo Studio","Amazon",199.99,null,4.6,245,"smart-home","Spatial audio smart speaker.",null,["smart-home","Amazon","Speaker"],false,true),
  p("Ring Alarm Pro","Ring",299.99,null,4.4,134,"smart-home","Home security with Wi-Fi.",null,["smart-home","Ring","Security"],false,true),
  p("Philips Hue Starter Kit","Philips",199.99,null,4.7,312,"smart-home","Smart color lighting.",null,["smart-home","Philips","Lighting"],false,true),
  p("Apple Mac Studio M2","Apple",1999.99,null,4.9,156,"components","Compact desktop powerhouse.",null,["components","Apple","Desktop"],false,true),
  p("NVIDIA RTX 4090","NVIDIA",1599.99,null,4.9,289,"components","Ultimate gaming GPU.",null,["components","NVIDIA","GPU"],false,true),
  p("AMD Ryzen 7 7800X3D","AMD",449.99,null,4.8,234,"components","Gaming CPU champion.",null,["components","AMD","CPU"],false,true),
  p("Samsung 990 Pro 2TB","Samsung",209.99,249.99,4.9,378,"components","Blazing-fast NVMe SSD.",null,["components","Samsung","Storage"],false,true),
  p("Corsair Vengeance 32GB","Corsair",119.99,null,4.7,198,"components","High-speed DDR5 RAM.",null,["components","Corsair","Memory"],false,true),
  p("ASUS ProArt 27\"","ASUS",499.99,null,4.6,167,"monitors","Color-accurate creative monitor.",null,["monitors","ASUS","Professional"],false,true),
  p("Samsung Odyssey G9","Samsung",1299.99,null,4.8,245,"monitors","49\" curved ultrawide.",null,["monitors","Samsung","Gaming"],false,true),
  p("LG UltraFine 5K","LG",1299.99,null,4.7,123,"monitors","5K retina display.",null,["monitors","LG","Professional"],false,true),
  p("DJI Air 3","DJI",1099.99,null,4.8,187,"drones","Dual-camera drone.",null,["drones","DJI","Drone"],false,true),
  p("DJI Mini 4 Pro","DJI",759.99,null,4.7,145,"drones","Compact pro-quality drone.",null,["drones","DJI","Drone"],false,true),
  p("Arlo Pro 5S","Arlo",249.99,null,4.5,98,"security","Wire-free security camera.",null,["security","Arlo","Camera"],false,true),
  p("EufyCam 3","Eufy",549.99,null,4.6,112,"security","Solar-powered security.",null,["security","Eufy","Camera"],false,true),
  p("Epson EcoTank","Epson",349.99,null,4.5,89,"printers","Cartridge-free printer.",null,["printers","Epson","Inkjet"],false,true),
  p("HP LaserJet Pro","HP",249.99,null,4.4,78,"printers","Office laser printer.",null,["printers","HP","Laser"],false,true),
  p("Apple Vision Pro","Apple",3499.99,null,4.8,123,"vr-ar","Spatial computing headset.",null,["vr-ar","Apple","Headset"],false,true),
  p("Epson Home Cinema","Epson",799.99,null,4.5,67,"projectors","4K PRO-UHD projector.",null,["projectors","Epson","Home Theater"],false,true),
  p("Netgear Orbi WiFi 7","Netgear",799.99,null,4.6,89,"networking","Next-gen mesh WiFi.",null,["networking","Netgear","Router"],false,true),
  p("Western Digital 8TB","WD",199.99,null,4.5,112,"storage","Desktop external HDD.",null,["storage","WD","External"],false,true),
];

const categoriesList = [
  "smartphones","laptops","audio","gaming","wearables","tablets","cameras",
  "tvs","smart-home","components","monitors","drones","security","printers","vr-ar","projectors","networking","storage"
];

const mockBlogs = [
  {
    _id: 'blog_1', title: "The Future of Gaming with PS5", slug: "future-of-gaming-ps5",
    content: "The PlayStation 5 is redefining the gaming landscape with high frame rates, stunning ray tracing, and ultra-fast SSD storage.",
    excerpt: "Redefining the gaming landscape with ray tracing and ultra-fast SSD storage.",
    author: "Alex Mercer", authorAvatar: "https://ui-avatars.com/api/?name=Alex+Mercer",
    category: "gaming", tags: ["gaming","PS5","Sony"], featured: true,
    image: "https://picsum.photos/seed/ps5blog/800/400.jpg", readTime: 5, likes: 124, views: 450,
    publishedAt: new Date(), createdAt: new Date()
  },
  {
    _id: 'blog_2', title: "Apple M3 Chip: A Leap Forward", slug: "apple-m3-chip-leap-forward",
    content: "Apple's new M3 family features 3nm technology with hardware-accelerated ray tracing and mesh shading.",
    excerpt: "Explore the new M3 chip family featuring 3nm technology.",
    author: "Sarah Connor", authorAvatar: "https://ui-avatars.com/api/?name=Sarah+Connor",
    category: "laptops", tags: ["laptops","Apple","M3"], featured: true,
    image: "https://picsum.photos/seed/m3blog/800/400.jpg", readTime: 7, likes: 98, views: 310,
    publishedAt: new Date(), createdAt: new Date()
  },
  {
    _id: 'blog_3', title: "Sony vs Bose: Headphone Showdown", slug: "sony-vs-bose-headphones",
    content: "Choosing between Sony WH-1000XM5 and Bose QuietComfort Ultra. An in-depth comparison.",
    excerpt: "Which premium ANC headphones reign supreme?",
    author: "Mark Evans", authorAvatar: "https://ui-avatars.com/api/?name=Mark+Evans",
    category: "audio", tags: ["audio","Sony","Bose"], featured: false,
    image: "https://picsum.photos/seed/headphoneblog/800/400.jpg", readTime: 6, likes: 87, views: 234,
    publishedAt: new Date(), createdAt: new Date()
  },
  {
    _id: 'blog_4', title: "Best Smartphones of 2024", slug: "best-smartphones-2024",
    content: "Our top picks for the best smartphones this year: iPhone, Galaxy, Pixel and more.",
    excerpt: "Top phone recommendations for every budget.",
    author: "Lisa Park", authorAvatar: "https://ui-avatars.com/api/?name=Lisa+Park",
    category: "smartphones", tags: ["smartphones","Apple","Samsung"], featured: true,
    image: "https://picsum.photos/seed/phoneblog/800/400.jpg", readTime: 8, likes: 156, views: 520,
    publishedAt: new Date(), createdAt: new Date()
  },
];

const mockUsers = [];

class MockQuery {
  constructor(data) { this.data = data; }
  sort(options) {
    if (!options) return this;
    const field = Object.keys(options)[0];
    const order = options[field];
    this.data.sort((a, b) => { if (a[field] < b[field]) return -order; if (a[field] > b[field]) return order; return 0; });
    return this;
  }
  skip(n) { this.data = this.data.slice(n); return this; }
  limit(n) { this.data = this.data.slice(0, n); return this; }
  select() { return this; }
  then(onResolve) { return Promise.resolve(this.data).then(onResolve); }
}

class MockUser {
  constructor(data) {
    Object.assign(this, data);
    this._id = this._id || 'user_' + Math.random().toString(36).substr(2, 9);
    this.cart = this.cart || [];
    this.wishlist = this.wishlist || [];
    this.orders = this.orders || [];
  }
  async save() {
    const idx = mockUsers.findIndex(u => u._id === this._id);
    if (idx >= 0) { mockUsers[idx] = { ...mockUsers[idx], ...this._doc || this }; }
    else { mockUsers.push({ _id: this._id, firstName: this.firstName, lastName: this.lastName, email: this.email, password: this.password, phone: this.phone, avatar: this.avatar, role: this.role || 'user', cart: this.cart, wishlist: this.wishlist, orders: this.orders }); }
    return this;
  }
}
MockUser.findOne = async (query) => {
  if (query.email) { const u = mockUsers.find(u => u.email === query.email); return u ? new MockUser(u) : null; }
  return null;
};
MockUser.findById = (id) => {
  const u = mockUsers.find(u => u._id === id || u.id === id);
  const mr = u ? new MockUser(u) : null;
  return { then: (r, rej) => Promise.resolve(mr).then(r, rej), catch: (rej) => Promise.resolve(mr).catch(rej), select: function() { return this; }, populate: function() { return this; } };
};

const MockProduct = {
  find: (query = {}) => {
    let f = [...mockProducts];
    if (query.category) { f = f.filter(p => p.category.toLowerCase() === query.category.toLowerCase()); }
    if (query.brand) { f = f.filter(p => p.brand.toLowerCase() === query.brand.toLowerCase()); }
    if (query.$or) {
      const nameSearch = query.$or.find(s => s.name);
      const sv = nameSearch ? nameSearch.name.$regex : '';
      if (sv) { const r = new RegExp(sv, 'i'); f = f.filter(p => r.test(p.name) || r.test(p.description) || (p.tags && p.tags.some(t => r.test(t)))); }
    }
    return new MockQuery(f);
  },
  countDocuments: async (query = {}) => { const qr = MockProduct.find(query); return qr.data.length; },
  findById: async (id) => mockProducts.find(p => p._id === id || p.id === id) || null,
  distinct: async (field) => [...new Set(mockProducts.map(p => p[field]))],
};

const MockBlog = {
  find: (query = {}) => {
    let f = [...mockBlogs];
    if (query.category) { f = f.filter(b => b.category.toLowerCase() === query.category.toLowerCase()); }
    if (query.featured) { f = f.filter(b => b.featured === true); }
    return new MockQuery(f);
  },
  countDocuments: async (query = {}) => { const qr = MockBlog.find(query); return qr.data.length; },
  findOne: async (query) => {
    if (query.slug) {
      const blog = mockBlogs.find(b => b.slug === query.slug);
      if (blog) return { ...blog, save: async function() { return this; } };
    }
    return null;
  }
};

const MockOrder = { find: () => new MockQuery([]), countDocuments: async () => 0, findById: async () => null };

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true }, lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true }, password: { type: String, required: true },
  phone: String, avatar: String, role: { type: String, enum: ['user','admin'], default: 'user' },
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  cart: [{ product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, quantity: { type: Number, default: 1 } }],
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  createdAt: { type: Date, default: Date.now }, updatedAt: { type: Date, default: Date.now }
});
const productSchema = new mongoose.Schema({
  name: { type: String, required: true }, description: String, price: { type: Number, required: true },
  originalPrice: Number, category: { type: String, required: true }, brand: { type: String, required: true },
  image: String, images: [String], rating: { type: Number, default: 0 }, reviews: { type: Number, default: 0 },
  inStock: { type: Boolean, default: true }, featured: { type: Boolean, default: false },
  specifications: Object, tags: [String], createdAt: { type: Date, default: Date.now }, updatedAt: { type: Date, default: Date.now }
});
const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{ product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, quantity: Number, price: Number }],
  totalAmount: Number, status: { type: String, enum: ['pending','processing','shipped','delivered','cancelled'], default: 'pending' },
  shippingAddress: { street: String, city: String, state: String, zipCode: String, country: String },
  paymentMethod: String, createdAt: { type: Date, default: Date.now }, deliveredAt: Date
});
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true }, slug: { type: String, required: true, unique: true },
  content: String, excerpt: String, author: String, authorAvatar: String, category: String,
  tags: [String], featured: { type: Boolean, default: false }, image: String,
  readTime: Number, likes: { type: Number, default: 0 }, views: { type: Number, default: 0 },
  publishedAt: { type: Date, default: Date.now }, createdAt: { type: Date, default: Date.now }
});

let User = MockUser;
let Product = MockProduct;
let Blog = MockBlog;
let Order = MockOrder;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/electronics-store')
.then(() => {
  console.log('✅ Connected to MongoDB. Using real database.');
  User = mongoose.model('User', userSchema);
  Product = mongoose.model('Product', productSchema);
  Order = mongoose.model('Order', orderSchema);
  Blog = mongoose.model('Blog', blogSchema);
}).catch(err => {
  console.error('❌ MongoDB error:', err.message);
  console.log('⚠️ Running in mock database mode');
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access token required' });
  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'User already exists' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ firstName, lastName, email, password: hashedPassword, phone, avatar: `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random` });
    await user.save();
    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '30d' });
    res.status(201).json({ message: 'User registered successfully', token, user: { id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email, phone: user.phone, avatar: user.avatar, role: user.role } });
  } catch (error) { res.status(500).json({ error: 'Registration failed', details: error.message }); }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '30d' });
    res.json({ message: 'Login successful', token, user: { id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email, phone: user.phone, avatar: user.avatar, role: user.role } });
  } catch (error) { res.status(500).json({ error: 'Login failed', details: error.message }); }
});

app.post('/api/auth/google', async (req, res) => {
  try {
    const { email, name, avatar, googleId } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });
    let user = await User.findOne({ email });
    if (!user) {
      const nameParts = (name || 'Google User').split(' ');
      user = new User({ firstName: nameParts[0], lastName: nameParts.slice(1).join(' ') || 'User', email, password: await bcrypt.hash(googleId || Date.now().toString(), 10), avatar: avatar || `https://ui-avatars.com/api/?name=${nameParts[0]}&background=random`, role: 'user' });
      await user.save();
    }
    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '30d' });
    res.json({ message: 'Google auth successful', token, user: { id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email, avatar: user.avatar, role: user.role } });
  } catch (error) { res.status(500).json({ error: 'Google auth failed', details: error.message }); }
});

// Product Routes
app.get('/api/products', async (req, res) => {
  try {
    const { page = 1, limit = 20, category, brand, search, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    let query = {};
    if (category) query.category = category.toLowerCase();
    if (brand) query.brand = brand;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
    const products = await Product.find(query).sort(sortOptions).skip(skip).limit(parseInt(limit));
    const total = await Product.countDocuments(query);
    res.json({ products, pagination: { currentPage: parseInt(page), totalPages: Math.ceil(total / parseInt(limit)), totalProducts: total, hasNext: page * limit < total, hasPrev: page > 1 } });
  } catch (error) { res.status(500).json({ error: 'Failed to fetch products', details: error.message }); }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) { res.status(500).json({ error: 'Failed to fetch product', details: error.message }); }
});

// Categories API
app.get('/api/categories', async (req, res) => {
  try {
    const cats = [...new Set(mockProducts.map(p => p.category))].sort();
    const result = cats.map(cat => ({
      id: cat, name: cat.charAt(0).toUpperCase() + cat.slice(1),
      productCount: mockProducts.filter(p => p.category === cat).length,
      featured: ['smartphones','laptops','audio','gaming','wearables'].includes(cat),
      trending: ['smartphones','gaming','cameras','drones','vr-ar'].includes(cat)
    }));
    res.json({ categories: result });
  } catch (error) { res.status(500).json({ error: 'Failed to fetch categories', details: error.message }); }
});

app.get('/api/categories/:id', async (req, res) => {
  try {
    const cat = req.params.id.toLowerCase();
    const products = mockProducts.filter(p => p.category === cat);
    if (!products.length) return res.status(404).json({ error: 'Category not found' });
    res.json({ category: { id: cat, name: cat.charAt(0).toUpperCase() + cat.slice(1), productCount: products.length }, products });
  } catch (error) { res.status(500).json({ error: 'Failed to fetch category', details: error.message }); }
});

// User Routes
app.get('/api/user/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) { res.status(500).json({ error: 'Failed to fetch profile', details: error.message }); }
});

app.get('/api/user/cart', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    const populated = await Promise.all((user.cart || []).map(async (item) => {
      const productId = item.product || item;
      const product = await Product.findById(productId.toString());
      if (!product) return null;
      return { ...(product._doc || product), _id: product._id || productId, quantity: item.quantity || 1 };
    }));
    res.json({ products: populated.filter(Boolean) });
  } catch (error) { res.status(500).json({ error: 'Failed to fetch cart', details: error.message }); }
});

app.put('/api/user/cart/:productId', authenticateToken, async (req, res) => {
  try {
    const { quantity } = req.body;
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    const item = user.cart.find(i => (i.product || i).toString() === req.params.productId);
    if (item) { item.quantity = quantity; await user.save(); }
    res.json({ message: 'Cart item updated' });
  } catch (error) { res.status(500).json({ error: 'Failed to update cart', details: error.message }); }
});

app.delete('/api/user/cart/:productId', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    user.cart = user.cart.filter(item => (item.product || item).toString() !== req.params.productId);
    await user.save();
    res.json({ message: 'Item removed from cart' });
  } catch (error) { res.status(500).json({ error: 'Failed to remove item', details: error.message }); }
});

app.delete('/api/user/wishlist/:productId', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    user.wishlist = user.wishlist.filter(id => id.toString() !== req.params.productId);
    await user.save();
    res.json({ message: 'Removed from wishlist' });
  } catch (error) { res.status(500).json({ error: 'Failed to remove from wishlist', details: error.message }); }
});

app.get('/api/user/wishlist', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    const populated = await Promise.all((user.wishlist || []).map(async (pid) => {
      const product = await Product.findById(pid.toString());
      return product ? (product._doc || product) : null;
    }));
    res.json({ products: populated.filter(Boolean) });
  } catch (error) { res.status(500).json({ error: 'Failed to fetch wishlist', details: error.message }); }
});

app.put('/api/user/wishlist', authenticateToken, async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.user.userId);
    if (!user.wishlist.includes(productId)) { user.wishlist.push(productId); await user.save(); }
    res.json({ message: 'Added to wishlist' });
  } catch (error) { res.status(500).json({ error: 'Failed to update wishlist', details: error.message }); }
});

app.put('/api/user/cart', authenticateToken, async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const user = await User.findById(req.user.userId);
    const existing = user.cart.find(item => item.product.toString() === productId);
    if (existing) { existing.quantity += quantity; } else { user.cart.push({ product: productId, quantity }); }
    await user.save();
    res.json({ message: 'Added to cart' });
  } catch (error) { res.status(500).json({ error: 'Failed to update cart', details: error.message }); }
});

// Orders
app.get('/api/user/orders', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ orders: user.orders || [] });
  } catch (error) { res.status(500).json({ error: 'Failed to fetch orders', details: error.message }); }
});

app.post('/api/user/orders', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    const order = { ...req.body, _id: 'order_' + Date.now(), createdAt: new Date(), status: 'pending' };
    user.orders = user.orders || [];
    user.orders.push(order);
    user.cart = [];
    await user.save();
    res.status(201).json({ message: 'Order created', order });
  } catch (error) { res.status(500).json({ error: 'Failed to create order', details: error.message }); }
});

// Blog Routes
app.get('/api/blogs', async (req, res) => {
  try {
    const { page = 1, limit = 10, category, featured } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    let query = {};
    if (category) query.category = category;
    if (featured === 'true') query.featured = true;
    const blogs = await Blog.find(query).sort({ publishedAt: -1 }).skip(skip).limit(parseInt(limit));
    const total = await Blog.countDocuments(query);
    res.json({ blogs, pagination: { currentPage: parseInt(page), totalPages: Math.ceil(total / parseInt(limit)), totalBlogs: total } });
  } catch (error) { res.status(500).json({ error: 'Failed to fetch blogs', details: error.message }); }
});

app.get('/api/blogs/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    blog.views += 1;
    await blog.save();
    res.json(blog);
  } catch (error) { res.status(500).json({ error: 'Failed to fetch blog', details: error.message }); }
});

app.get('/', (req, res) => {
  res.json({ message: 'Electronics Store API Server', status: 'Running', endpoints: { auth: '/api/auth', products: '/api/products', categories: '/api/categories', users: '/api/user', blogs: '/api/blogs' } });
});

app.use((err, req, res, next) => { console.error(err.stack); res.status(500).json({ error: 'Something went wrong!' }); });

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📦 ${mockProducts.length} products | ${categoriesList.length} categories | ${mockBlogs.length} blogs`);
  console.log(`🔐 JWT authentication enabled`);
});
