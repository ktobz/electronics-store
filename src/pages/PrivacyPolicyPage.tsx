import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    Shield, Lock, Eye, Database, UserCheck, Cookie, 
    Globe, Mail, Phone, FileText, AlertCircle, CheckCircle,
    Calendar, Users, Settings, Download, Trash2, Share2
} from 'lucide-react';
import '../styles/PrivacyPolicyPage.scss';

const privacySections = [
    {
        title: 'Information We Collect',
        icon: <Database size={24} />,
        content: 'We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us. This includes your name, email address, shipping address, payment information, and order details.',
        details: [
            'Personal identification information (name, email, phone)',
            'Shipping and billing addresses',
            'Payment information (processed securely)',
            'Order history and preferences',
            'Device and browser information'
        ]
    },
    {
        title: 'How We Use Your Information',
        icon: <Settings size={24} />,
        content: 'We use the information we collect to provide, maintain, and improve our services, process transactions, communicate with you, and personalize your experience.',
        details: [
            'Process and fulfill your orders',
            'Provide customer support',
            'Send transactional emails',
            'Personalize your shopping experience',
            'Improve our products and services'
        ]
    },
    {
        title: 'Information Sharing',
        icon: <Share2 size={24} />,
        content: 'We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.',
        details: [
            'Payment processors for transactions',
            'Shipping carriers for delivery',
            'Analytics providers (anonymized data)',
            'Legal requirements when necessary',
            'Service providers with strict confidentiality'
        ]
    },
    {
        title: 'Data Security',
        icon: <Lock size={24} />,
        content: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.',
        details: [
            'SSL encryption for all data transmission',
            'Secure payment processing',
            'Regular security audits',
            'Employee training on data protection',
            'Limited access to personal information'
        ]
    },
    {
        title: 'Cookies and Tracking',
        icon: <Cookie size={24} />,
        content: 'We use cookies and similar tracking technologies to track activity on our service and hold certain information to improve your experience.',
        details: [
            'Essential cookies for site functionality',
            'Analytics cookies for usage insights',
            'Marketing cookies for personalized ads',
            'Preference cookies for user experience',
            'You can control cookies in your browser'
        ]
    },
    {
        title: 'Your Rights',
        icon: <UserCheck size={24} />,
        content: 'You have the right to access, update, or delete your personal information. You can also opt out of marketing communications.',
        details: [
            'Access your personal data',
            'Correct inaccurate information',
            'Delete your account and data',
            'Opt out of marketing emails',
            'Request data portability'
        ]
    }
];

const rightsList = [
    { icon: <Eye size={20} />, title: 'Access', description: 'View all personal data we hold about you' },
    { icon: <Download size={20} />, title: 'Export', description: 'Download your data in a portable format' },
    { icon: <Trash2 size={20} />, title: 'Delete', description: 'Request permanent deletion of your data' },
    { icon: <Settings size={20} />, title: 'Control', description: 'Manage your privacy preferences' }
];

const contactInfo = [
    { icon: <Mail size={20} />, label: 'Email', value: 'privacy@electrostore.com' },
    { icon: <Phone size={20} />, label: 'Phone', value: '1-800-ELECTRO' },
    { icon: <Globe size={20} />, label: 'Website', value: 'www.electrostore.com/privacy' }
];

const PrivacyPolicyPage: React.FC = () => {
    const [expandedSection, setExpandedSection] = useState<number | null>(null);

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
        <div className="privacy-policy-page">
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
                            <Shield size={64} />
                        </div>
                        <h1>Privacy Policy</h1>
                        <p>Your privacy is our priority. Learn how we protect and use your information.</p>
                        <div className="last-updated">
                            <Calendar size={16} />
                            Last updated: January 1, 2024
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Overview Section */}
            <section className="overview-section">
                <div className="container">
                    <motion.div
                        className="overview-content"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2>Our Commitment to Privacy</h2>
                        <p>
                            At ElectroStore, we are committed to protecting your personal information and 
                            ensuring transparency about how we collect, use, and share your data. This 
                            privacy policy outlines our practices and your rights regarding your information.
                        </p>
                        <div className="commitment-cards">
                            <div className="commitment-card">
                                <CheckCircle size={24} />
                                <span>We never sell your personal information</span>
                            </div>
                            <div className="commitment-card">
                                <Lock size={24} />
                                <span>Bank-level security for all data</span>
                            </div>
                            <div className="commitment-card">
                                <Eye size={24} />
                                <span>Transparent data practices</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Privacy Sections */}
            <section className="privacy-sections">
                <div className="container">
                    <motion.div 
                        className="sections-grid"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {privacySections.map((section, index) => (
                            <motion.div
                                key={section.title}
                                className="privacy-card"
                                variants={itemVariants}
                            >
                                <div className="card-header">
                                    <div className="card-icon">{section.icon}</div>
                                    <h3>{section.title}</h3>
                                </div>
                                <p className="card-content">{section.content}</p>
                                <button
                                    className="expand-btn"
                                    onClick={() => setExpandedSection(expandedSection === index ? null : index)}
                                >
                                    {expandedSection === index ? 'Show Less' : 'Learn More'}
                                </button>
                                {expandedSection === index && (
                                    <motion.div
                                        className="card-details"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                    >
                                        <ul>
                                            {section.details.map((detail, idx) => (
                                                <li key={idx}>
                                                    <CheckCircle size={16} />
                                                    {detail}
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Your Rights Section */}
            <section className="rights-section">
                <div className="container">
                    <motion.div
                        className="section-header"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2>Your Privacy Rights</h2>
                        <p>You have control over your personal information</p>
                    </motion.div>

                    <div className="rights-grid">
                        {rightsList.map((right, index) => (
                            <motion.div
                                key={right.title}
                                className="right-card"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="right-icon">{right.icon}</div>
                                <h3>{right.title}</h3>
                                <p>{right.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

    {/* Data Protection Section */}
    <section className="protection-section">
        <div className="container">
            <motion.div
                className="protection-content"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <h2>Data Protection Measures</h2>
                <div className="protection-grid">
                    <div className="protection-item">
                        <Lock size={32} />
                        <div>
                            <h3>Encryption</h3>
                            <p>All data is encrypted using industry-standard SSL/TLS protocols</p>
                        </div>
                    </div>
                    <div className="protection-item">
                        <Shield size={32} />
                        <div>
                            <h3>Access Control</h3>
                            <p>Strict access controls limit who can view your information</p>
                        </div>
                    </div>
                    <div className="protection-item">
                        <Users size={32} />
                        <div>
                            <h3>Training</h3>
                            <p>Regular privacy training for all employees handling data</p>
                        </div>
                    </div>
                    <div className="protection-item">
                        <FileText size={32} />
                        <div>
                            <h3>Compliance</h3>
                            <p>Full compliance with GDPR, CCPA, and other privacy laws</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    </section>

    {/* Contact Section */}
    <section className="contact-section">
        <div className="container">
            <motion.div
                className="contact-content"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <h2>Privacy Questions?</h2>
                <p>If you have questions about this privacy policy or your data rights, contact us</p>
                <div className="contact-grid">
                    {contactInfo.map((contact, index) => (
                        <motion.div
                            key={contact.label}
                            className="contact-card"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="contact-icon">{contact.icon}</div>
                            <h3>{contact.label}</h3>
                            <p>{contact.value}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    </section>

    {/* Footer Section */}
    <section className="footer-section">
        <div className="container">
            <motion.div
                className="footer-content"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                <div className="footer-links">
                    <a href="#terms">Terms of Service</a>
                    <a href="#cookies">Cookie Policy</a>
                    <a href="#contact">Contact Us</a>
                </div>
                <p className="copyright">
                    © 2024 ElectroStore. All rights reserved.
                </p>
            </motion.div>
        </div>
    </section>
        </div>
    );
};

export default PrivacyPolicyPage;
