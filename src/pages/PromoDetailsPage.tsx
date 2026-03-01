import React, { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Star, Shield, Zap, Award, ChevronRight, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/PromoDetailsPage.scss';

import hero1 from '../images/hero-1.png';
import hero2 from '../images/hero-2.png';
import hero3 from '../images/hero-3.png';

const features = [
    { icon: <Star size={24} />, title: 'Premium Build', desc: 'Crafted with aerospace-grade materials for unparalleled durability.' },
    { icon: <Zap size={24} />, title: 'Next-Gen Performance', desc: 'Powered by the latest architecture, delivering speed without compromise.' },
    { icon: <Shield size={24} />, title: 'Extended Warranty', desc: '3-year comprehensive protection included with every purchase.' },
    { icon: <Award size={24} />, title: 'Award Winning', desc: 'Internationally recognized for exceptional design and engineering.' }
];

const showcaseItems = [
    {
        title: "The Zenith of Sound",
        subtitle: "Aural Perfection",
        description: "Experience every note exactly as the artist intended. Our flagship audio line redefines spatial sound with precision-machined acoustic chambers.",
        image: hero1,
        alignment: "left"
    },
    {
        title: "Precision Engineering",
        subtitle: "Power Unleashed",
        description: "Seamlessly blending raw performance with featherweight portability. This is the new standard for professional computing on the go.",
        image: hero2,
        alignment: "right"
    },
    {
        title: "Visions of Tomorrow",
        subtitle: "Capture Reality",
        description: "A sensor that bends light to your will. Professional-grade photography tools designed for those who refuse to miss the perfect shot.",
        image: hero3,
        alignment: "left"
    }
];

const PromoDetailsPage: React.FC = () => {
    const navigate = useNavigate();
    const { scrollYProgress } = useScroll();
    const yHero = useTransform(scrollYProgress, [0, 1], [0, 300]);
    const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="promo-details-page">
            {/* Minimalist Header Navigation */}
            <nav className="promo-nav">
                <div className="container promo-nav__container">
                    <button className="promo-nav__back" onClick={() => navigate(-1)}>
                        <ArrowLeft size={20} />
                        <span>Back</span>
                    </button>
                    <div className="promo-nav__brand">ElectroZone Exclusives</div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="promo-hero">
                <div className="promo-hero__background"></div>
                <motion.div
                    className="container promo-hero__container"
                    style={{ y: yHero, opacity: opacityHero }}
                >
                    <motion.div
                        className="promo-hero__badge"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    >
                        2026 Collection
                    </motion.div>
                    <motion.h1
                        className="promo-hero__title"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        Beyond Limit.
                        <br />
                        <span className="text-gradient">Pure Innovation.</span>
                    </motion.h1>
                    <motion.p
                        className="promo-hero__subtitle"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                    >
                        Discover our most advanced lineup ever. Engineered for those who demand excellence in every detail.
                    </motion.p>
                    <motion.div
                        className="promo-hero__actions"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                    >
                        <button className="btn-luxury" onClick={() => navigate('/products')}>
                            Shop the Collection
                            <ChevronRight size={18} />
                        </button>
                        <button className="btn-luxury-outline">
                            <Play size={18} fill="currentColor" />
                            Watch Film
                        </button>
                    </motion.div>
                </motion.div>
            </section>

            {/* Features Section */}
            <section className="promo-features">
                <div className="container">
                    <div className="features-grid">
                        {features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                className="feature-card"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ delay: idx * 0.1, duration: 0.6 }}
                            >
                                <div className="feature-icon">{feature.icon}</div>
                                <h3>{feature.title}</h3>
                                <p>{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Showcase Sections */}
            <section className="promo-showcase">
                {showcaseItems.map((item, index) => (
                    <div className={`showcase-row ${item.alignment}`} key={index}>
                        <div className="container showcase-container">
                            <motion.div
                                className="showcase-content"
                                initial={{ opacity: 0, x: item.alignment === 'left' ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-200px" }}
                                transition={{ duration: 0.8 }}
                            >
                                <span className="showcase-subtitle">{item.subtitle}</span>
                                <h2>{item.title}</h2>
                                <p>{item.description}</p>
                                <button className="link-arrow">
                                    Learn more <ArrowLeft size={16} style={{ transform: "rotate(180deg)" }} />
                                </button>
                            </motion.div>
                            <motion.div
                                className="showcase-visual"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: "-200px" }}
                                transition={{ duration: 1 }}
                            >
                                <div className="visual-glow"></div>
                                <img src={item.image} alt={item.title} />
                            </motion.div>
                        </div>
                    </div>
                ))}
            </section>

            {/* Final CTA */}
            <section className="promo-cta">
                <div className="promo-cta__background"></div>
                <div className="container">
                    <motion.div
                        className="cta-content"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2>The Future is Here.</h2>
                        <p>Experience our latest collection today with exclusive financing options available.</p>
                        <button className="btn-luxury" onClick={() => navigate('/products')}>
                            Explore All Products
                        </button>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default PromoDetailsPage;
