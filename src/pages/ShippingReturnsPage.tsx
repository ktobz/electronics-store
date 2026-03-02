import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Truck, Package, Clock, MapPin,
    CheckCircle, RefreshCw, DollarSign,
    Globe, Phone, Mail, ArrowRight
} from 'lucide-react';
import '../styles/ShippingReturnsPage.scss';

const shippingOptions = [
    {
        name: 'Standard Shipping',
        price: '$9.99',
        time: '3-5 Business Days',
        icon: <Truck size={24} />,
        features: ['Free on orders over $100', 'Tracking included', 'Insurance up to $100'],
        popular: false
    },
    {
        name: 'Express Shipping',
        price: '$19.99',
        time: '1-2 Business Days',
        icon: <Package size={24} />,
        features: ['Priority processing', 'Full tracking', 'Insurance up to $500'],
        popular: true
    },
    {
        name: 'Overnight Shipping',
        price: '$29.99',
        time: 'Next Business Day',
        icon: <Clock size={24} />,
        features: ['Guaranteed delivery', 'Real-time tracking', 'Full insurance'],
        popular: false
    },
    {
        name: 'International Shipping',
        price: '$39.99',
        time: '7-14 Business Days',
        icon: <Globe size={24} />,
        features: ['Customs handling', 'International tracking', 'Duties included'],
        popular: false
    }
];

const returnPolicy = [
    {
        title: '30-Day Return Window',
        description: 'Return any item within 30 days of delivery for a full refund.',
        icon: <Clock size={20} />
    },
    {
        title: 'Original Condition Required',
        description: 'Items must be unused, in original packaging with all accessories.',
        icon: <Package size={20} />
    },
    {
        title: 'Free Return Shipping',
        description: 'We provide prepaid return labels for all returns.',
        icon: <DollarSign size={20} />
    },
    {
        title: 'Quick Refunds',
        description: 'Refunds processed within 5 business days of receipt.',
        icon: <RefreshCw size={20} />
    }
];

const internationalInfo = [
    { country: 'United States', shipping: '3-5 days', cost: '$9.99', free: '$100' },
    { country: 'Canada', shipping: '5-7 days', cost: '$14.99', free: '$150' },
    { country: 'United Kingdom', shipping: '7-10 days', cost: '$19.99', free: '$200' },
    { country: 'Australia', shipping: '7-12 days', cost: '$24.99', free: '$250' },
    { country: 'Germany', shipping: '5-8 days', cost: '$16.99', free: '$175' },
    { country: 'France', shipping: '6-9 days', cost: '$18.99', free: '$185' }
];

const faqItems = [
    {
        question: 'How do I track my order?',
        answer: 'Once your order ships, you\'ll receive an email with tracking information. You can also track your order by logging into your account.'
    },
    {
        question: 'Can I change my shipping address?',
        answer: 'Address changes are possible within 2 hours of order placement. After this time, please contact customer service immediately.'
    },
    {
        question: 'What if my package is lost or damaged?',
        answer: 'All shipments are insured. Contact us within 48 hours of delivery for damaged items or if your package doesn\'t arrive.'
    },
    {
        question: 'Do you ship to PO boxes?',
        answer: 'We ship to PO boxes for standard shipping only. Express and overnight shipping require physical addresses.'
    }
];

const ShippingReturnsPage: React.FC = () => {
    const [selectedShipping, setSelectedShipping] = useState('Express Shipping');
    const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

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
        <div className="shipping-returns-page">
            {/* Hero Section */}
            <motion.section
                className="hero-section"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="container">
                    <div className="hero-content">
                        <div className="hero-icon">
                            <Truck size={64} />
                        </div>
                        <h1>Shipping & Returns</h1>
                        <p>Fast, reliable delivery and hassle-free returns on all orders</p>
                    </div>
                </div>
            </motion.section>

            {/* Shipping Options */}
            <section className="shipping-section">
                <div className="container">
                    <motion.div
                        className="section-header"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2>Shipping Options</h2>
                        <p>Choose the delivery method that works best for you</p>
                    </motion.div>

                    <motion.div
                        className="shipping-grid"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {shippingOptions.map((option) => (
                            <motion.div
                                key={option.name}
                                className={`shipping-card ${selectedShipping === option.name ? 'selected' : ''}`}
                                variants={itemVariants}
                                onClick={() => setSelectedShipping(option.name)}
                                whileHover={{ scale: 1.02, y: -5 }}
                            >
                                {option.popular && (
                                    <div className="popular-badge">Most Popular</div>
                                )}
                                <div className="shipping-icon">{option.icon}</div>
                                <h3>{option.name}</h3>
                                <div className="shipping-price">{option.price}</div>
                                <div className="shipping-time">{option.time}</div>
                                <ul className="shipping-features">
                                    {option.features.map((feature, idx) => (
                                        <li key={idx}>
                                            <CheckCircle size={16} />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Return Policy */}
            <section className="returns-section">
                <div className="container">
                    <motion.div
                        className="section-header"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2>Return Policy</h2>
                        <p>We want you to be completely satisfied with your purchase</p>
                    </motion.div>

                    <div className="returns-grid">
                        {returnPolicy.map((item, index) => (
                            <motion.div
                                key={item.title}
                                className="return-card"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="return-icon">{item.icon}</div>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* International Shipping */}
            <section className="international-section">
                <div className="container">
                    <motion.div
                        className="section-header"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2>International Shipping</h2>
                        <p>We ship to over 50 countries worldwide</p>
                    </motion.div>

                    <div className="international-table">
                        <div className="table-header">
                            <div>Country</div>
                            <div>Delivery Time</div>
                            <div>Cost</div>
                            <div>Free Shipping</div>
                        </div>
                        {internationalInfo.map((country, index) => (
                            <motion.div
                                key={country.country}
                                className="table-row"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <div className="country-name">
                                    <MapPin size={16} />
                                    {country.country}
                                </div>
                                <div>{country.shipping}</div>
                                <div>{country.cost}</div>
                                <div>Orders over {country.free}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Timeline */}
            <section className="process-section">
                <div className="container">
                    <motion.div
                        className="section-header"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2>Our Process</h2>
                        <p>From order to delivery, here's how it works</p>
                    </motion.div>

                    <div className="process-timeline">
                        {[
                            { step: '1', title: 'Order Placed', description: 'Receive instant confirmation' },
                            { step: '2', title: 'Processing', description: 'We prepare your items (1-2 days)' },
                            { step: '3', title: 'Shipped', description: 'Package sent with tracking' },
                            { step: '4', title: 'Delivered', description: 'Enjoy your new products!' }
                        ].map((item, index) => (
                            <motion.div
                                key={item.step}
                                className="process-step"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="step-number">{item.step}</div>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="faq-section">
                <div className="container">
                    <motion.div
                        className="section-header"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2>Frequently Asked Questions</h2>
                        <p>Quick answers to common shipping and return questions</p>
                    </motion.div>

                    <div className="faq-list">
                        {faqItems.map((item, index) => (
                            <motion.div
                                key={index}
                                className="faq-item"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <button
                                    className="faq-question"
                                    onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                                >
                                    <span>{item.question}</span>
                                    <motion.div
                                        animate={{ rotate: expandedFAQ === index ? 180 : 0 }}
                                    >
                                        <ArrowRight size={20} />
                                    </motion.div>
                                </button>
                                {expandedFAQ === index && (
                                    <motion.div
                                        className="faq-answer"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                    >
                                        {item.answer}
                                    </motion.div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact CTA */}
            <section className="contact-cta">
                <div className="container">
                    <motion.div
                        className="cta-content"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2>Need Help with Shipping?</h2>
                        <p>Our customer service team is here to assist you</p>
                        <div className="cta-buttons">
                            <button className="cta-button primary">
                                <Phone size={20} />
                                Call Support
                            </button>
                            <button className="cta-button secondary">
                                <Mail size={20} />
                                Email Us
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default ShippingReturnsPage;
