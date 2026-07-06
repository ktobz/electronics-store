import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, Shield, Zap, Settings, LogOut, ChevronRight, Edit2, Crown } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import '../styles/ProfilePage.scss';

const ProfilePage: React.FC = () => {
    const { user, points, isDarkMode, logout } = useStore();
    const navigate = useNavigate();

    const displayName = user ? `${user.firstName} ${user.lastName}` : 'Valued Customer';
    const displayEmail = user?.email || '';

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <motion.div
            className={`profile-page ${isDarkMode ? 'theme--dark' : ''}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="profile-container">
                <header className="profile-header">
                    <div className="profile-header__bg"></div>
                    <div className="profile-header__content">
                        <div className="user-avatar-main">
                            {(displayName || 'U')[0].toUpperCase()}
                            <div className="status-badge"><Zap size={12} /></div>
                        </div>
                        <div className="user-info-main">
                            <h1>{displayName}</h1>
                            <p>{displayEmail}</p>
                            <div className="badge-rack">
                                <span className="badge badge--vip"><Crown size={12} /> Premium Member</span>
                                <span className="badge badge--points">{points} Electro Points</span>
                            </div>
                        </div>
                        <button className="edit-profile-btn"><Edit2 size={16} /> Edit Profile</button>
                    </div>
                </header>
                <div className="profile-grid">
                    <div className="profile-col-left">
                        <section className="profile-section">
                            <div className="section-header"><User size={20} /><h2>Account Information</h2></div>
                            <div className="info-cards">
                                <div className="info-card"><label>Full Name</label><p>{displayName}</p></div>
                                <div className="info-card"><label>Email Address</label><p>{displayEmail}</p></div>
                                <div className="info-card"><label>Phone Number</label><p>{user?.phone || '+1 (555) 000-0000'}</p></div>
                            </div>
                        </section>
                        <section className="profile-section">
                            <div className="section-header"><Shield size={20} /><h2>Security</h2></div>
                            <div className="action-list">
                                <button className="action-item">
                                    <div className="action-icon"><Settings size={18} /></div><div className="action-text"><h3>Change Password</h3><p>Update your account security</p></div>
                                    <ChevronRight size={18} />
                                </button>
                                <button className="action-item">
                                    <div className="action-icon"><Zap size={18} /></div><div className="action-text"><h3>Two-Factor Authentication</h3><p>Add an extra layer of protection</p></div>
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                        </section>
                    </div>
                    <div className="profile-col-right">
                        <div className="points-card animate-float">
                            <div className="points-card__icon"><Zap size={40} /></div>
                            <div className="points-card__info"><h3>Total Balance</h3><div className="points-value">{points}</div><p>Electro Points Available</p></div>
                            <button className="redeem-btn">Redeem Points</button>
                        </div>
                        <div className="membership-card">
                            <h3>Tier Progress</h3>
                            <div className="progress-container">
                                <div className="progress-labels"><span>Gold Tier</span><span>Platinum Tier</span></div>
                                <div className="progress-bar"><div className="progress-fill" style={{ width: '65%' }}></div></div>
                                <p>You are 350 points away from Platinum status!</p>
                            </div>
                        </div>
                        <button className="logout-button-alt" onClick={handleLogout}><LogOut size={18} /> Sign Out</button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProfilePage;
