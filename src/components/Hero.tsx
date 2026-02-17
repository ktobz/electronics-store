import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ShoppingCart, Info, Star } from 'lucide-react';
import '../styles/Hero.scss';

const slides = [
    {
        id: 1,
        title: "The Future of Sound",
        subtitle: "Experience crystal clear audio with our premium range of headphones.",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop",
        cta: "Shop Now",
        accent: "#f43f5e"
    },
    {
        id: 2,
        title: "Next Gen Computing",
        subtitle: "Unleash your creativity with the most powerful laptops in the market.",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=2026&auto=format&fit=crop",
        cta: "View Models",
        accent: "#8b5cf6"
    },
    {
        id: 3,
        title: "Capture Every Moment",
        subtitle: "Professional grade photography tools for enthusiasts and pros.",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2076&auto=format&fit=crop",
        cta: "Explore Cameras",
        accent: "#0ea5e9"
    }
];

const Hero: React.FC = () => {
    const [current, setCurrent] = useState(0);

    const next = useCallback(() => {
        setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, []);

    const prev = useCallback(() => {
        setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    }, []);

    useEffect(() => {
        const timer = setInterval(next, 6000);
        return () => clearInterval(timer);
    }, [next]);

    return (
        <section className="hero">
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    className="hero__slide"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${slides[current].image})` }}
                >
                    <div className="container hero__container">
                        <motion.div
                            className="hero__content"
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                        >
                            <div className="hero__badge" style={{ backgroundColor: slides[current].accent }}>
                                <Star size={14} fill="white" />
                                <span>Electro Store Selection</span>
                            </div>
                            <h1 className="hero__title">{slides[current].title}</h1>
                            <p className="hero__subtitle">{slides[current].subtitle}</p>

                            <div className="hero__btns">
                                <button className="btn btn-primary hero-btn">
                                    <ShoppingCart size={18} />
                                    {slides[current].cta}
                                </button>
                                <button className="btn btn-secondary hero-btn">
                                    <Info size={18} />
                                    Details
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="hero__controls">
                <button onClick={prev} className="hero__control-btn" aria-label="Previous slide">
                    <ChevronLeft size={24} />
                </button>
                <div className="hero__dots">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            className={`hero__dot ${i === current ? 'active' : ''}`}
                            onClick={() => setCurrent(i)}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>
                <button onClick={next} className="hero__control-btn" aria-label="Next slide">
                    <ChevronRight size={24} />
                </button>
            </div>
        </section>
    );
};

export default Hero;
