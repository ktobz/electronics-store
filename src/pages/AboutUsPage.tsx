import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Heart } from 'lucide-react';
import '../styles/PrivacyPolicyPage.scss'; // Reuse policy styles

const AboutUsPage: React.FC = () => {
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
                            <Users size={64} />
                        </div>
                        <h1>About Us</h1>
                        <p>We are pioneers in delivering next-generation technology directly to your doorstep.</p>
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
                        <h2>Our Mission</h2>
                        <p>
                            At ElectroZone, we believe that premium technology should be accessible, experiential, and transformative. We curate only the best electronics to elevate your everyday life.
                        </p>
                        <div className="commitment-cards">
                            <div className="commitment-card">
                                <Target size={24} />
                                <span>Curated Excellence</span>
                            </div>
                            <div className="commitment-card">
                                <Heart size={24} />
                                <span>Customer Obsession</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default AboutUsPage;
