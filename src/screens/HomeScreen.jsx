import React from 'react';
import { Button, Card, Rate } from 'antd';
import {
    HeartOutlined,
    SafetyCertificateOutlined,
    ThunderboltOutlined,
    UserOutlined,
    CheckCircleOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { analytics } from '../utils/analytics';
import logo from '../assets/logo_primary.jpg';


const HomeScreen = () => {
    const navigate = useNavigate();

    const handleGetStarted = (source) => {
        analytics.trackCTA('get_started', source);
        analytics.trackSignupStart(source);
        navigate('/signup');
    };

    return (
        <div className="min-h-screen bg-background font-sans text-text">
            {/* Header / Nav */}
            <header className="fixed w-full bg-background/80 backdrop-blur-xl z-50 border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex items-center">
                            <img src={logo} alt="BHAOS Logo" className="h-32 w-auto mix-blend-screen brightness-125 contrast-150" />
                        </div>
                        <nav className="flex items-center gap-6">
                            <Button
                                type="text"
                                onClick={() => navigate('/login')}
                                className="text-text/70 hover:text-primary font-medium transition-colors"
                            >
                                Clinician Portal
                            </Button>
                            <Button
                                type="primary"
                                size="large"
                                className="bg-primary hover:bg-primary/90 border-none shadow-2xl shadow-primary/20 rounded-full h-11 px-6 font-semibold"
                                data-cta="nav-download"
                                onClick={() => handleGetStarted('nav')}
                            >
                                Get Started
                            </Button>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="pt-40 pb-20 lg:pt-52 lg:pb-32 overflow-hidden relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-primary/10 to-transparent pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium text-sm mb-10">
                            <HeartOutlined /> #1 Mental Health Companion
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-[1.1] text-text">
                            Your Mental Health <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-400 to-primary/80">
                                Operating System
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-text/60 mb-12 max-w-2xl mx-auto lg:mx-auto leading-relaxed">
                            A safe space for your journey. Track progress, connect with clinicians, and build lasting habits—all in one place.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            <Button
                                type="primary"
                                size="large"
                                className="h-16 px-10 text-xl rounded-full bg-primary hover:bg-primary/90 border-none shadow-[0_0_40px_rgba(43,102,203,0.3)] w-full sm:w-auto font-bold"
                                data-cta="hero-download"
                                onClick={() => handleGetStarted('hero')}
                            >
                                Start Your Journey
                            </Button>
                            <div className="flex items-center gap-3 text-text/40 text-base">
                                <SafetyCertificateOutlined className="text-success text-xl" />
                                <span>HIPAA Compliant & Secure</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Social Proof */}
            <section className="py-24 bg-surface/30 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl font-bold mb-4 text-text">You Are Not Alone</h2>
                        <p className="text-text/60 text-xl max-w-2xl mx-auto">Join 10,000+ users finding their balance with HealthOS.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                text: "I finally felt heard. This app isn't just a tracker; it's a lifeline. 'This is me' is what I say every time I use it.",
                                author: "Sarah M.",
                                role: "Anxiety Warrior"
                            },
                            {
                                text: "The connection with my therapist has never been better. It feels like we're on the same page before I even walk in the door.",
                                author: "James T.",
                                role: "Growth Seeker"
                            },
                            {
                                text: "Simple, beautiful, and effective. It helps me make sense of my chaotic days.",
                                author: "Emily R.",
                                role: "Daily User"
                            }
                        ].map((testimonial, i) => (
                            <div key={i} className="bg-surface p-8 rounded-3xl shadow-xl hover:shadow-primary/5 transition-all border border-white/5 group hover:border-primary/30">
                                <Rate disabled defaultValue={5} className="text-primary mb-6 text-sm" />
                                <p className="text-text/80 italic mb-8 leading-relaxed text-lg">"{testimonial.text}"</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary font-bold text-lg group-hover:bg-primary group-hover:text-white transition-colors">
                                        {testimonial.author[0]}
                                    </div>
                                    <div>
                                        <div className="font-bold text-text text-lg">{testimonial.author}</div>
                                        <div className="text-sm text-text/40">{testimonial.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Value Props */}
            <section className="py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-32">
                        <div className="order-2 lg:order-1">
                            <div className="w-20 h-20 bg-success/10 rounded-3xl flex items-center justify-center text-success text-3xl mb-8 shadow-inner shadow-success/20">
                                <ThunderboltOutlined />
                            </div>
                            <h3 className="text-4xl font-extrabold mb-6 text-text">Real-time Insights</h3>
                            <p className="text-xl text-text/60 mb-8 leading-relaxed">
                                Don't wait for your next appointment to understand your patterns.
                                Get instant feedback on your mood, habits, and progress.
                            </p>
                            <ul className="space-y-4">
                                {['Daily Mood Tracking', 'Habit Formation Analytics', 'Sleep Quality Insights'].map(item => (
                                    <li key={item} className="flex items-center gap-4 text-text/80 text-lg">
                                        <CheckCircleOutlined className="text-success text-xl" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="order-1 lg:order-2 bg-gradient-to-br from-primary/20 via-primary/5 to-surface rounded-[3rem] p-12 h-[500px] flex items-center justify-center border border-white/5 relative group">
                            <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full group-hover:bg-primary/10 transition-colors"></div>
                            <div className="relative text-text/40 font-bold text-xl uppercase tracking-widest bg-background/40 backdrop-blur-md px-10 py-5 rounded-2xl border border-white/5">
                                Dashboard Interface
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <div className="bg-gradient-to-br from-secondary/40 via-secondary/5 to-surface rounded-[3rem] p-12 h-[500px] flex items-center justify-center border border-white/5 relative group">
                            <div className="absolute inset-0 bg-secondary/10 blur-3xl rounded-full group-hover:bg-secondary/20 transition-colors"></div>
                            <div className="relative text-text/40 font-bold text-xl uppercase tracking-widest bg-background/40 backdrop-blur-md px-10 py-5 rounded-2xl border border-white/5">
                                Clinician View
                            </div>
                        </div>
                        <div>
                            <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary text-3xl mb-8 shadow-inner shadow-primary/20">
                                <UserOutlined />
                            </div>
                            <h3 className="text-4xl font-extrabold mb-6 text-text">Seamless Connection</h3>
                            <p className="text-xl text-text/60 mb-8 leading-relaxed">
                                Share your journey with your clinician automatically.
                                Less time explaining, more time growing.
                            </p>
                            <ul className="space-y-4">
                                {['Secure Data Sharing', 'Direct Messaging', 'Telehealth Integration'].map(item => (
                                    <li key={item} className="flex items-center gap-4 text-text/80 text-lg">
                                        <CheckCircleOutlined className="text-primary text-xl" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center gap-2 mb-4">
                                <img src={logo} alt="BHAOS Logo" className="h-10 w-auto mix-blend-screen" />
                                <span className="text-xl font-bold text-white">BHAOS</span>
                            </div>
                            <p className="text-gray-400 max-w-sm">
                                Behavioral Health Operations & Automation System. Empowering better mental health through technology and human connection.
                            </p>
                        </div>
                        <div>
                            <h5 className="font-bold mb-4">Product</h5>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">For Clinicians</a></li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-bold mb-4">Legal</h5>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">HIPAA</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-500 text-sm">© 2026 BHAOS. All rights reserved.</p>
                        <div className="flex items-center gap-4">
                            <span className="text-gray-500 text-sm flex items-center gap-1">

                            </span>
                            <span className="text-gray-500 text-sm flex items-center gap-1">
                                <SafetyCertificateOutlined /> Secure & Encrypted
                            </span>
                            <a
                                onClick={() => navigate('/login')}
                                className="text-gray-500 hover:text-white text-sm cursor-pointer transition-colors"
                            >
                                Clinician Portal
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
            {/* Analytics Injection Point */}
            {/* TODO: Add Google Analytics / Pixel here */}
        </div>
    );
};

export default HomeScreen;
