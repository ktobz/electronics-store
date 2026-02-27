import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Calendar, ArrowRight, Search, Clock } from 'lucide-react';
import { fetchBlogPosts, type BlogPost } from '../services/mockApi';
import '../styles/BlogPage.scss';

const BlogPage: React.FC = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const loadPosts = async () => {
            const data = await fetchBlogPosts();
            setPosts(data);
            setLoading(false);
        };
        loadPosts();
    }, []);

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="blog-loading">
                <div className="loader"></div>
                <p>Curating Tech Insights...</p>
            </div>
        );
    }

    return (
        <div className="blog-page">
            <section className="blog-hero">
                <div className="container">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="blog-hero__title"
                    >
                        Tech Insights
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="blog-hero__subtitle"
                    >
                        Deep dives, comparisons, and the latest from the world of premium electronics.
                    </motion.p>
                </div>
            </section>

            <div className="container blog-container">
                <div className="blog-controls">
                    <div className="search-bar">
                        <Search size={20} />
                        <input
                            type="text"
                            placeholder="Search articles, categories, or tech..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="blog-grid">
                    {filteredPosts.map((post, idx) => (
                        <motion.article
                            key={post.id}
                            className="blog-card-full"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            onClick={() => navigate(`/blog/${post.id}`)}
                        >
                            <div className="blog-card-full__image">
                                <img src={post.image} alt={post.title} />
                                <div className="blog-card-full__category">{post.category}</div>
                            </div>
                            <div className="blog-card-full__content">
                                <div className="blog-card-full__meta">
                                    <span><Calendar size={14} /> {post.date}</span>
                                    <span><Clock size={14} /> {post.readTime}</span>
                                </div>
                                <h2 className="blog-card-full__title">{post.title}</h2>
                                <p className="blog-card-full__excerpt">{post.excerpt}</p>
                                <div className="blog-card-full__footer">
                                    <div className="author">
                                        <img src={post.authorImage} alt={post.author} />
                                        <div>
                                            <strong>{post.author}</strong>
                                            <span>{post.authorRole}</span>
                                        </div>
                                    </div>
                                    <button className="read-btn">
                                        Read Story <ArrowRight size={18} />
                                    </button>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>

                {filteredPosts.length === 0 && (
                    <div className="no-results">
                        <h3>No stories found for "{searchTerm}"</h3>
                        <p>Try searching for different keywords or categories.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogPage;
