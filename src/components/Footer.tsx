import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import '../styles/Footer.scss';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="container footer__container">
                <div className="footer__column">
                    <h3 className="footer__logo">ElectroZone</h3>
                    <p className="footer__text">
                        Your one-stop shop for the latest electronics and gadgets. We bring the future to your doorstep.
                    </p>
                    <div className="footer__social">
                        <a href="https://facebook.com/samsung" target="_blank" rel="noopener noreferrer" className="social-link" title="Facebook">
                            <Facebook size={20} />
                        </a>
                        <a href="https://twitter.com/panasonic" target="_blank" rel="noopener noreferrer" className="social-link" title="Twitter">
                            <Twitter size={20} />
                        </a>
                        <a href="https://instagram.com/sony" target="_blank" rel="noopener noreferrer" className="social-link" title="Instagram">
                            <Instagram size={20} />
                        </a>
                        <a href="https://youtube.com/apple" target="_blank" rel="noopener noreferrer" className="social-link" title="Youtube">
                            <Youtube size={20} />
                        </a>
                    </div>
                </div>

                <div className="footer__column">
                    <h4 className="footer__heading">Quick Links</h4>
                    <ul className="footer__links">
                        <li><a href="#">Home</a></li>
                        <li><a href="#products">Products</a></li>
                        <li><a href="#categories">Categories</a></li>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </div>

                <div className="footer__column">
                    <h4 className="footer__heading">Customer Service</h4>
                    <ul className="footer__links">
                        <li><a href="#">FAQ</a></li>
                        <li><a href="#">Shipping & Returns</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Terms of Service</a></li>
                    </ul>
                </div>

                <div className="footer__column">
                    <h4 className="footer__heading">Contact Us</h4>
                    <ul className="footer__contact-info">
                        <li><MapPin size={16} /> 123 Tech Avenue, Silicon Valley, CA</li>
                        <li><Phone size={16} /> +1 (555) 123-4567</li>
                        <li><Mail size={16} /> support@electrozone.com</li>
                    </ul>
                </div>
            </div>
            <div className="footer__bottom">
                <div className="container">
                    <p>&copy; {new Date().getFullYear()} ElectroZone. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
