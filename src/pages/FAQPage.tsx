import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ChevronDown, ChevronUp, HelpCircle, MessageCircle, 
    Phone, Mail, Truck, Shield, CreditCard, Package,
    Clock, Award, Users, Zap, Star, ArrowRight
} from 'lucide-react';
import '../styles/FAQPage.scss';

interface FAQItem {
    id: string;
    question: string;
    answer: string;
    category: string;
    icon: React.ReactNode;
}

const faqData: FAQItem[] = [
    {
        id: '1',
        question: 'What is your return policy?',
        answer: 'We offer a 30-day return policy on all products. Items must be in their original condition with all accessories and packaging. Simply initiate a return through your account or contact our customer service team for assistance.',
        category: 'Returns',
        icon: <Package size={20} />
    },
    {
        id: '2',
        question: 'How long does shipping take?',
        answer: 'Standard shipping takes 3-5 business days, while express shipping takes 1-2 business days. International shipping typically takes 7-14 business days. You\'ll receive tracking information once your order ships.',
        category: 'Shipping',
        icon: <Truck size={20} />
    },
    {
        id: '3',
        question: 'Do you offer international shipping?',
        answer: 'Yes, we ship to over 50 countries worldwide. International shipping rates and delivery times vary by destination. You can check if we ship to your country during checkout.',
        category: 'Shipping',
        icon: <Package size={20} />
    },
    {
        id: '4',
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, Google Pay, and Shop Pay. All transactions are secured with industry-standard encryption.',
        category: 'Payment',
        icon: <CreditCard size={20} />
    },
    {
        id: '5',
        question: 'Is my payment information secure?',
        answer: 'Absolutely. We use SSL encryption and comply with PCI DSS standards. Your payment information is never stored on our servers, and we use trusted payment processors for all transactions.',
        category: 'Security',
        icon: <Shield size={20} />
    },
    {
        id: '6',
        question: 'Do you offer warranty on your products?',
        answer: 'Yes, all products come with a manufacturer\'s warranty ranging from 1-3 years depending on the product. Extended warranty options are available at checkout for additional coverage.',
        category: 'Warranty',
        icon: <Award size={20} />
    },
    {
        id: '7',
        question: 'How can I track my order?',
        answer: 'Once your order ships, you\'ll receive an email with tracking information. You can also track your order by logging into your account and viewing your order history.',
        category: 'Orders',
        icon: <Package size={20} />
    },
    {
        id: '8',
        question: 'What if I receive a damaged item?',
        answer: 'If you receive a damaged item, please contact us within 48 hours with photos of the damage. We\'ll arrange for a replacement or full refund immediately, including return shipping if necessary.',
        category: 'Returns',
        icon: <Package size={20} />
    },
    {
        id: '9',
        question: 'Do you have a customer loyalty program?',
        answer: 'Yes! Our Electro Rewards program offers points for every purchase, exclusive discounts, early access to sales, and special member-only offers. You earn 10 points for every dollar spent.',
        category: 'Rewards',
        icon: <Star size={20} />
    },
    {
        id: '10',
        question: 'Can I cancel or modify my order?',
        answer: 'Orders can be cancelled or modified within 2 hours of placement. After this time, the order enters our fulfillment process and cannot be changed. Please contact customer service immediately if you need assistance.',
        category: 'Orders',
        icon: <Clock size={20} />
    },
    {
        id: '11',
        question: 'Do you offer technical support?',
        answer: 'Yes, we provide free technical support for all products purchased from us. Our expert team is available via phone, email, or live chat to help with setup, troubleshooting, and product questions.',
        category: 'Support',
        icon: <MessageCircle size={20} />
    },
    {
        id: '12',
        question: 'What is your price match guarantee?',
        answer: 'We offer a 30-day price match guarantee. If you find the same product at a lower price from an authorized retailer, we\'ll match the price and give you an additional 5% discount.',
        category: 'Pricing',
        icon: <Award size={20} />
    }
];

const categories = [
    { name: 'All', icon: <HelpCircle size={18} /> },
    { name: 'Shipping', icon: <Truck size={18} /> },
    { name: 'Returns', icon: <Package size={18} /> },
    { name: 'Payment', icon: <CreditCard size={18} /> },
    { name: 'Security', icon: <Shield size={18} /> },
    { name: 'Warranty', icon: <Award size={18} /> },
    { name: 'Orders', icon: <Package size={18} /> },
    { name: 'Support', icon: <MessageCircle size={18} /> },
    { name: 'Rewards', icon: <Star size={18} /> },
    { name: 'Pricing', icon: <Award size={18} /> }
];

const contactOptions = [
    {
        icon: <Phone size={24} />,
        title: 'Phone Support',
        description: 'Mon-Fri 9AM-6PM EST',
        value: '1-800-ELECTRO',
        action: 'Call Now'
    },
    {
        icon: <Mail size={24} />,
        title: 'Email Support',
        description: 'Response within 24 hours',
        value: 'support@electrostore.com',
        action: 'Send Email'
    },
    {
        icon: <MessageCircle size={24} />,
        title: 'Live Chat',
        description: 'Available 24/7',
        value: 'Instant help',
        action: 'Start Chat'
    }
];

const FAQPage: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [expandedItems, setExpandedItems] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredFAQs = faqData.filter(item => {
        const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
        const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              item.answer.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const toggleExpanded = (id: string) => {
        setExpandedItems(prev => 
            prev.includes(id) 
                ? prev.filter(item => item !== id)
                : [...prev, id]
        );
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="faq-page">
            {/* Hero Section */}
            <motion.section 
                className="faq-hero"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="container">
                    <div className="hero-content">
                        <motion.div 
                            className="hero-icon"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        >
                            <HelpCircle size={64} />
                        </motion.div>
                        <h1 className="hero-title">How Can We Help?</h1>
                        <p className="hero-subtitle">
                            Find answers to common questions or get in touch with our expert support team
                        </p>
                        
                        {/* Search Bar */}
                        <div className="search-container">
                            <div className="search-bar">
                                <HelpCircle size={20} className="search-icon" />
                                <input
                                    type="text"
                                    placeholder="Search for answers..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="search-input"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Stats Section */}
            <section className="stats-section">
                <div className="container">
                    <div className="stats-grid">
                        {[
                            { icon: <Users size={24} />, value: '50K+', label: 'Happy Customers' },
                            { icon: <Award size={24} />, value: '4.9/5', label: 'Customer Rating' },
                            { icon: <Clock size={24} />, value: '24/7', label: 'Support Available' },
                            { icon: <Zap size={24} />, value: '< 1hr', label: 'Response Time' }
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                className="stat-card"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 + index * 0.1 }}
                            >
                                <div className="stat-icon">{stat.icon}</div>
                                <div className="stat-value">{stat.value}</div>
                                <div className="stat-label">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Category Filter */}
            <section className="filter-section">
                <div className="container">
                    <div className="category-filter">
                        <h3>Browse by Category</h3>
                        <div className="category-pills">
                            {categories.map((category) => (
                                <button
                                    key={category.name}
                                    className={`category-pill ${selectedCategory === category.name ? 'active' : ''}`}
                                    onClick={() => setSelectedCategory(category.name)}
                                >
                                    {category.icon}
                                    <span>{category.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Items */}
            <section className="faq-section">
                <div className="container">
                    <motion.div 
                        className="faq-container"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {filteredFAQs.map((item) => (
                            <motion.div
                                key={item.id}
                                className="faq-item"
                                variants={itemVariants}
                            >
                                <button
                                    className="faq-question"
                                    onClick={() => toggleExpanded(item.id)}
                                >
                                    <div className="question-content">
                                        <div className="question-icon">{item.icon}</div>
                                        <span className="question-text">{item.question}</span>
                                    </div>
                                    <div className="question-toggle">
                                        {expandedItems.includes(item.id) ? (
                                            <ChevronUp size={20} />
                                        ) : (
                                            <ChevronDown size={20} />
                                        )}
                                    </div>
                                </button>
                                
                                <AnimatePresence>
                                    {expandedItems.includes(item.id) && (
                                        <motion.div
                                            className="faq-answer"
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="answer-content">
                                                {item.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </motion.div>

                    {filteredFAQs.length === 0 && (
                        <motion.div
                            className="no-results"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <HelpCircle size={48} />
                            <h3>No results found</h3>
                            <p>Try adjusting your search or browse all categories</p>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Contact Section */}
            <section className="contact-section">
                <div className="container">
                    <motion.div
                        className="contact-content"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2>Still Need Help?</h2>
                        <p>Our expert support team is ready to assist you with any questions or concerns.</p>
                        
                        <div className="contact-grid">
                            {contactOptions.map((option, index) => (
                                <motion.div
                                    key={index}
                                    className="contact-card"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ scale: 1.05, y: -5 }}
                                >
                                    <div className="contact-icon">{option.icon}</div>
                                    <h3>{option.title}</h3>
                                    <p className="contact-description">{option.description}</p>
                                    <div className="contact-value">{option.value}</div>
                                    <button className="contact-action">
                                        {option.action}
                                        <ArrowRight size={16} />
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default FAQPage;
