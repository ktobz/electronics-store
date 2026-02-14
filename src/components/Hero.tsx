import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import '../styles/Hero.scss';

const Hero: React.FC = () => {
    return (
        <section className="hero">
            <div className="container hero__container">
                <motion.div
                    className="hero__content"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="hero__title">
                        Next-Gen Tech <br />
                        <span className="highlight">For Your Lifestyle</span>
                    </h1>
                    <p className="hero__description">
                        Discover the latest gadgets and electronics designed to elevate your everyday experience. From smart home devices to high-performance audio.
                    </p>
                    <div className="hero__cta">
                        <button className="btn btn-primary">
                            Shop Now <ArrowRight size={18} />
                        </button>
                        <button className="btn btn-secondary">View Deals</button>
                    </div>
                </motion.div>

                <motion.div
                    className="hero__image-wrapper"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    {/* Placeholder for hero image - using a gradient blob for modern feel for now if no image */}
                    <div className="hero__image-placeholder">
                        <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Latest Tech" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
