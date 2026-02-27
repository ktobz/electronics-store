import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ArrowLeft, Share2, Twitter, Facebook } from 'lucide-react';
import { fetchBlogPostById, type BlogPost } from '../services/mockApi';
import '../styles/BlogPostPage.scss';

const BlogPostPage: React.FC = () => {
    const { id } = useParams();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const loadPost = async () => {
            if (id) {
                const data = await fetchBlogPostById(parseInt(id));
                if (data) {
                    setPost(data);
                }
                setLoading(false);
            }
        };
        loadPost();
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) {
        return <div className="loading-state">Loading Story...</div>;
    }

    if (!post) {
        return (
            <div className="error-state">
                <h1>Story not found</h1>
                <button onClick={() => navigate('/blog')}>Back to Tech Insights</button>
            </div>
        );
    }

    return (
        <article className="blog-post-page">
            <header className="post-header">
                <div className="container">
                    <button className="back-link" onClick={() => navigate('/blog')}>
                        <ArrowLeft size={20} /> Back to Tech Insights
                    </button>

                    <div className="post-header__content">
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="post-category"
                        >
                            {post.category}
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="post-title"
                        >
                            {post.title}
                        </motion.h1>

                        <div className="post-author-bar">
                            <img src={post.authorImage} alt={post.author} />
                            <div className="author-info">
                                <strong>{post.author}</strong>
                                <span>{post.authorRole} • {post.date}</span>
                            </div>
                            <div className="meta-reading">
                                <Clock size={16} /> {post.readTime}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <section className="post-featured-image">
                <div className="container">
                    <img src={post.image} alt={post.title} />
                </div>
            </section>

            <section className="post-content-container">
                <div className="container post-grid">
                    <aside className="post-sidebar">
                        <div className="share-box">
                            <span>Share Story</span>
                            <div className="share-links">
                                <button title="Twitter"><Twitter size={20} /></button>
                                <button title="Facebook"><Facebook size={20} /></button>
                                <button title="Copy Link"><Share2 size={20} /></button>
                            </div>
                        </div>
                        <div className="tags-box">
                            <span>Tags</span>
                            <div className="tags">
                                {post.tags.map(tag => <span key={tag} className="tag">#{tag}</span>)}
                            </div>
                        </div>
                    </aside>

                    <main className="post-main-content">
                        <div className="content-body">
                            {/* Simple Markdown-like rendering for this mock implementation */}
                            {post.content.split('\n\n').map((block, i) => {
                                if (block.startsWith('# ')) return <h1 key={i}>{block.replace('# ', '')}</h1>;
                                if (block.startsWith('### ')) return <h3 key={i}>{block.replace('### ', '')}</h3>;
                                return <p key={i}>{block}</p>;
                            })}
                        </div>

                        <div className="post-footer">
                            <div className="author-card">
                                <img src={post.authorImage} alt={post.author} />
                                <div className="card-content">
                                    <h3>About {post.author}</h3>
                                    <p>{post.authorRole} covering the latest in consumer electronics and future technology trends at Electron Store.</p>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </section>
        </article>
    );
};

export default BlogPostPage;
