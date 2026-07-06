import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { blogAPI } from '../services/api';
import type { BlogPost } from '../types';
import '../styles/BlogSection.scss';

const BlogSection: React.FC = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const data = await blogAPI.getBlogs({ limit: 3 });
                setPosts(data.blogs || []);
            } catch (err) {
                console.error('Failed to load blog posts:', err);
            } finally {
                setLoading(false);
            }
        };
        loadPosts();
    }, []);

    return (
        <section className="blog-section">
            <div className="container">
                <div className="blog-section__header">
                    <div>
                        <h2 className="section-title">Tech Insights & News</h2>
                        <p className="section-subtitle">Stay updated with the latest trends and product guides.</p>
                    </div>
                    <button className="view-all-btn" onClick={() => navigate('/blog')}>
                        View All News <ArrowRight size={18} />
                    </button>
                </div>

                {loading ? (
                    <div className="blog-loading-lite">Loading insights...</div>
                ) : (
                    <div className="blog-grid">
                        {posts.map((post, idx) => (
                            <motion.article
                                key={post._id || post.id}
                                className="blog-card"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                onClick={() => navigate(`/blog/${post.slug || post.id}`)}
                            >
                                <div className="blog-card__image">
                                    <img src={post.image} alt={post.title} />
                                    <span className="blog-card__category">{post.category}</span>
                                </div>
                                <div className="blog-card__content">
                                    <div className="blog-card__meta">
                                        <span><Calendar size={14} /> {post.date || (post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : '')}</span>
                                        <span><User size={14} /> {post.author}</span>
                                    </div>
                                    <h3 className="blog-card__title">{post.title}</h3>
                                    <p className="blog-card__excerpt">{post.excerpt}</p>
                                    <Link to={`/blog/${post.slug || post.id}`} className="read-more-btn">
                                        Read More <ArrowRight size={18} />
                                    </Link>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default BlogSection;
