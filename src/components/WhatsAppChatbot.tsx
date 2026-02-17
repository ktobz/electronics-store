import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, User } from 'lucide-react';
import '../styles/WhatsAppChatbot.scss';

const WhatsAppChatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: 'Hello! Welcome to ElectroZone Support. How can I help you today?', sender: 'agent', time: '12:00 PM' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) scrollToBottom();
    }, [messages, isOpen, isTyping]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const userMsg = {
            id: Date.now(),
            text: inputValue,
            sender: 'user',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsTyping(true);

        // Simulate agent response
        setTimeout(() => {
            const agentMsg = {
                id: Date.now() + 1,
                text: getAgentResponse(userMsg.text),
                sender: 'agent',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setIsTyping(false);
            setMessages(prev => [...prev, agentMsg]);
        }, 1500);
    };

    const getAgentResponse = (text: string) => {
        const lowerText = text.toLowerCase();
        if (lowerText.includes('order')) return 'I can help you with your order! Please provide your Order ID or visit our Track Order page.';
        if (lowerText.includes('samsung')) return 'Samsung products are currently on sale! Check out our Official Samsung Store tab for exclusive deals.';
        if (lowerText.includes('panasonic')) return 'We have a wide range of Panasonic appliances and cameras. Head over to the Panasonic Store to see all 10+ featured items.';
        return 'Thank you for reaching out! A human agent will be with you shortly to further assist you.';
    };

    return (
        <div className="whatsapp-chatbot">
            <button className="chatbot-toggle" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X /> : <MessageCircle size={28} />}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="chatbot-window"
                    >
                        <header className="chatbot-header">
                            <div className="agent-info">
                                <div className="agent-avatar">
                                    <User size={20} />
                                    <span className="online-indicator"></span>
                                </div>
                                <div>
                                    <h4>ElectroZone Assistant</h4>
                                    <p>Online | Typically responds in seconds</p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)}><X size={20} /></button>
                        </header>

                        <div className="chatbot-messages">
                            {messages.map(msg => (
                                <div key={msg.id} className={`message ${msg.sender}`}>
                                    <div className="message-bubble">
                                        {msg.text}
                                        <span className="message-time">{msg.time}</span>
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="message agent">
                                    <div className="message-bubble typing">
                                        <span>.</span><span>.</span><span>.</span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        <form onSubmit={handleSendMessage} className="chatbot-input">
                            <input
                                type="text"
                                placeholder="Type your message..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                            <button type="submit" disabled={!inputValue.trim()}>
                                <Send size={20} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default WhatsAppChatbot;
