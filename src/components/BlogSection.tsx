import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, User } from 'lucide-react';
import '../styles/BlogSection.scss';

const blogPosts = [
    {
        id: 1,
        title: "The Future of Smart Homes: Top Trends for 2024",
        excerpt: "Discover how AI and IoT are transforming our living spaces into intelligent environments.",
        image: "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        date: "Oct 20, 2023",
        author: "Alex Rivers"
    },
    {
        id: 2,
        title: "Sony vs Bose: Which Headphones Should You Choose?",
        excerpt: "An in-depth comparison of the latest noise-canceling flagships in the audio world.",
        image: "https://images.unsplash.com/photo-1546435770-a3e426ff472b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        date: "Oct 18, 2023",
        author: "Sarah Chen"
    },
    {
        id: 3,
        title: "Revolutionizing Photography with Panasonic Lumix S5II",
        excerpt: "Why this camera is a game-changer for both videographers and photographers alike.",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        date: "Oct 15, 2023",
        author: "Mark Evans"
    }
];

const BlogSection: React.FC = () => {
    return (
        <section className="blog-section">
            <div className="container">
                <div className="blog-section__header">
                    <div>
                        <h2 className="section__title">Tech Insights & News</h2>
                        <p className="section__subtitle">Stay updated with the latest trends and product guides.</p>
                    </div>
                    <button className="view-all-btn">
                        View All News <ArrowRight size={18} />
                    </button>
                </div>

                <div className="blog-grid">
                    {blogPosts.map((post, idx) => (
                        <motion.article
                            key={post.id}
                            className="blog-card"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <div className="blog-card__image">
                                <img src={post.image} alt={post.title} />
                                <span className="blog-card__category">Tech News</span>
                            </div>
                            <div className="blog-card__content">
                                <div className="blog-card__meta">
                                    <span><Calendar size={14} /> {post.date}</span>
                                    <span><User size={14} /> {post.author}</span>
                                </div>
                                <h3 className="blog-card__title">{post.title}</h3>
                                <p className="blog-card__excerpt">{post.excerpt}</p>
                                <button className="read-more-btn">
                                    Read More <ArrowRight size={18} />
                                </button>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogSection;
