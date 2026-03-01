import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ShoppingCart, Info, Star } from 'lucide-react';
import '../styles/Hero.scss';

import hero1 from '../images/hero-1.png';
import hero2 from '../images/hero-2.png';
import hero3 from '../images/hero-3.png';

const slides = [
    {
        id: 1,
        title: "The Zenith of Sound",
        subtitle: "Immerse yourself in pure, high-fidelity audio with our flagship wireless headphones collection.",
        image: hero1,
        cta: "Shop Audio",
        link: "/category/audio",
        accent: "#c5a059"
    },
    {
        id: 2,
        title: "Precision Engineering",
        subtitle: "Experience the ultimate power and portability with our latest ultrabook series.",
        image: hero2,
        cta: "Explore Tech",
        link: "/category/laptops",
        accent: "#c5a059"
    },
    {
        id: 3,
        title: "Visions of Tomorrow",
        subtitle: "Capture life's most precious details with our professional-grade photography tools.",
        image: hero3,
        cta: "View Cameras",
        link: "/category/cameras",
        accent: "#c5a059"
    }
];

const Hero: React.FC = () => {
    const navigate = useNavigate();
    const [current, setCurrent] = useState(0);
    const [isReversed, setIsReversed] = useState(false);

    const next = useCallback(() => {
        setIsReversed(false);
        setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, []);

    const prev = useCallback(() => {
        setIsReversed(true);
        setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    }, []);

    useEffect(() => {
        const timer = setInterval(next, 7000);
        return () => clearInterval(timer);
    }, [next]);

    const slideVariants = {
        hidden: (custom: boolean) => ({
            opacity: 0,
            x: custom ? -100 : 100,
            scale: 1.1
        }),
        visible: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: {
                duration: 1.2,
                ease: [0.6, 0.01, 0.05, 0.9] as any
            }
        },
        exit: (custom: boolean) => ({
            opacity: 0,
            x: custom ? 100 : -100,
            scale: 0.9,
            transition: {
                duration: 0.8,
                ease: "easeInOut" as any
            }
        })
    };

    const contentVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.5 + i * 0.15,
                duration: 0.8,
                ease: "easeOut" as any
            }
        })
    };

    return (
        <section className="hero">
            <AnimatePresence mode="wait" custom={isReversed}>
                <motion.div
                    key={current}
                    className="hero__slide"
                    custom={isReversed}
                    variants={slideVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <img
                        src={slides[current].image}
                        alt={slides[current].title}
                        className="hero__background-img"
                    />
                    <div className="hero__overlay" />

                    <div className="container hero__container">
                        <div className="hero__content">
                            <motion.div
                                variants={contentVariants}
                                initial="hidden"
                                animate="visible"
                                custom={0}
                                className="hero__badge"
                                style={{ backgroundColor: slides[current].accent }}
                            >
                                <Star size={14} fill="white" />
                                <span>Premium Tech selection</span>
                            </motion.div>

                            <motion.h1
                                variants={contentVariants}
                                initial="hidden"
                                animate="visible"
                                custom={1}
                                className="hero__title"
                            >
                                {slides[current].title}
                            </motion.h1>

                            <motion.p
                                variants={contentVariants}
                                initial="hidden"
                                animate="visible"
                                custom={2}
                                className="hero__subtitle"
                            >
                                {slides[current].subtitle}
                            </motion.p>

                            <motion.div
                                variants={contentVariants}
                                initial="hidden"
                                animate="visible"
                                custom={3}
                                className="hero__btns"
                            >
                                <button
                                    className="btn btn-primary hero-btn"
                                    onClick={() => navigate(slides[current].link)}
                                >
                                    <ShoppingCart size={18} />
                                    {slides[current].cta}
                                </button>
                                <button
                                    className="btn btn-secondary hero-btn"
                                    onClick={() => navigate('/promo-details')}
                                >
                                    <Info size={18} />
                                    Details
                                </button>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            <div className="hero__controls">
                <button onClick={prev} className="hero__control-btn" aria-label="Previous slide">
                    <ChevronLeft size={24} />
                </button>
                <div className="hero__dots">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            className={`hero__dot ${i === current ? 'active' : ''}`}
                            onClick={() => {
                                setIsReversed(i < current);
                                setCurrent(i);
                            }}
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
