import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import '../styles/Hero.scss';

const slides = [
    {
        id: 1,
        title: "Next-Gen Tech For Your Lifestyle",
        description: "Discover the latest gadgets and electronics designed to elevate your everyday experience. From smart home devices to high-performance audio.",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        cta: "Shop Now",
        link: "#products"
    },
    {
        id: 2,
        title: "Stay Connected with Cutting-Edge Wearables",
        description: "Track your fitness, receive notifications, and express your style with our premium smartwatches and fitness trackers.",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        cta: "Explore Watches",
        link: "#products"
    },
    {
        id: 3,
        title: "Immerse Yourself in Pure Sound",
        description: "Experience music like never before with our range of high-fidelity headphones and wireless audio solutions.",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        cta: "Browse Audio",
        link: "#products"
    }
];

const Hero: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [direction, setDirection] = useState(0);

    const nextSlide = useCallback(() => {
        setDirection(1);
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, []);

    const prevSlide = useCallback(() => {
        setDirection(-1);
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(timer);
    }, [nextSlide]);

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    };

    return (
        <section className="hero">
            <div className="container hero__container">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={currentSlide}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.5 }
                        }}
                        className="hero__slide"
                    >
                        <div className="hero__content">
                            <h1 className="hero__title">
                                {slides[currentSlide].title.split(' For ')[0]} <br />
                                <span className="highlight">{slides[currentSlide].title.split(' For ')[1] ? `For ${slides[currentSlide].title.split(' For ')[1]}` : ''}</span>
                            </h1>
                            <p className="hero__description">
                                {slides[currentSlide].description}
                            </p>
                            <div className="hero__cta">
                                <button className="btn btn-primary">
                                    {slides[currentSlide].cta} <ArrowRight size={18} />
                                </button>
                                <button className="btn btn-secondary">View Deals</button>
                            </div>
                        </div>

                        <div className="hero__image-wrapper">
                            <div className="hero__image-placeholder">
                                <img src={slides[currentSlide].image} alt={slides[currentSlide].title} />
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                <div className="hero__controls">
                    <button className="hero__control hero__control--prev" onClick={prevSlide}>
                        <ChevronLeft size={24} />
                    </button>
                    <button className="hero__control hero__control--next" onClick={nextSlide}>
                        <ChevronRight size={24} />
                    </button>
                </div>

                <div className="hero__indicators">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            className={`hero__indicator ${index === currentSlide ? 'hero__indicator--active' : ''}`}
                            onClick={() => {
                                setDirection(index > currentSlide ? 1 : -1);
                                setCurrentSlide(index);
                            }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Hero;
