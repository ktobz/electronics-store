import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, BookOpen, AlertCircle } from 'lucide-react';
import '../styles/PrivacyPolicyPage.scss'; // Reuse policy styles

const TermsOfServicePage: React.FC = () => {
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
                            <BookOpen size={64} />
                        </div>
                        <h1>Terms of Service</h1>
                        <p>Guidelines for using our services safely and responsibly.</p>
                        <div className="last-updated">
                            Last updated: March 1, 2026
                        </div>
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
                        <h2>Agreement to Terms</h2>
                        <p>
                            By accessing or using ElectroStore services, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.
                        </p>
                        <div className="commitment-cards">
                            <div className="commitment-card">
                                <Shield size={24} />
                                <span>User Responsibilities</span>
                            </div>
                            <div className="commitment-card">
                                <AlertCircle size={24} />
                                <span>Prohibited Activities</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default TermsOfServicePage;
