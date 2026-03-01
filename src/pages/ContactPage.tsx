import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Headset, Mail, MapPin } from 'lucide-react';
import '../styles/PrivacyPolicyPage.scss'; // Reuse policy styles

const ContactPage: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="privacy-policy-page">
            <motion.section
                className="hero-section"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="container">
                    <div className="hero-content">
                        <div className="hero-icon">
                            <Headset size={64} />
                        </div>
                        <h1>Contact Support</h1>
                        <p>Available 24/7 to assist with your premium tech needs.</p>
                    </div>
                </div>
            </motion.section>

            <section className="overview-section">
                <div className="container">
                    <motion.div
                        className="overview-content"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2>Get in Touch</h2>
                        <p>
                            Whether you need technical support, order tracking, or consultation on your next purchase, our specialized agents are standing by.
                        </p>
                        <div className="commitment-cards">
                            <div className="commitment-card">
                                <Mail size={24} />
                                <span>support@electrozone.com</span>
                            </div>
                            <div className="commitment-card">
                                <MapPin size={24} />
                                <span>123 Tech Avenue, Silicon Valley</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;
