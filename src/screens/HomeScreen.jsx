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


const HomeScreen = () => {
    const navigate = useNavigate();

    const handleGetStarted = (source) => {
        analytics.trackCTA('get_started', source);
        analytics.trackSignupStart(source);
        navigate('/signup');
    };

    return (
        <div className="min-h-screen bg-white font-sans text-gray-800">
            {/* Header / Nav */}
            <header className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
                                HealthOS
                            </span>
                        </div>
                        <nav className="flex gap-4">
                            <Button
                                type="text"
                                onClick={() => navigate('/login')}
                                className="text-gray-600 hover:text-primary font-medium"
                            >
                                Clinician Login
                            </Button>
                            <Button
                                type="primary"
                                size="large"
                                className="bg-primary hover:bg-primary-dark border-none shadow-lg shadow-primary/30"
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
            <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 font-medium text-sm mb-8 animate-fade-in-up">
                            <HeartOutlined /> #1 Mental Health Companion
                        </div>
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight text-gray-900">
                            Your Mental Health <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
                                Operating System
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                            A safe space for your journey. Track progress, connect with clinicians, and build lasting habits—all in one place.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Button
                                type="primary"
                                size="large"
                                className="h-14 px-8 text-lg rounded-full bg-primary hover:bg-primary-dark border-none shadow-xl shadow-primary/30 w-full sm:w-auto"
                                data-cta="hero-download"
                                onClick={() => handleGetStarted('hero')}
                            >
                                Start Your Journey
                            </Button>
                            <div className="flex items-center gap-2 text-gray-500 text-sm">
                                <SafetyCertificateOutlined className="text-green-500 text-lg" />
                                <span>HIPAA Compliant & Secure</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Social Proof */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">You Are Not Alone</h2>
                        <p className="text-gray-600 text-lg">Join 10,000+ users finding their balance.</p>
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
                            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                                <Rate disabled defaultValue={5} className="text-yellow-400 mb-4 text-sm" />
                                <p className="text-gray-700 italic mb-6 leading-relaxed">"{testimonial.text}"</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                                        {testimonial.author[0]}
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900">{testimonial.author}</div>
                                        <div className="text-sm text-gray-500">{testimonial.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Value Props */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
                        <div className="order-2 lg:order-1">
                            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 text-2xl mb-6">
                                <ThunderboltOutlined />
                            </div>
                            <h3 className="text-3xl font-bold mb-4">Real-time Insights</h3>
                            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                Don't wait for your next appointment to understand your patterns.
                                Get instant feedback on your mood, habits, and progress.
                            </p>
                            <ul className="space-y-3">
                                {['Daily Mood Tracking', 'Habit Formation Analytics', 'Sleep Quality Insights'].map(item => (
                                    <li key={item} className="flex items-center gap-3 text-gray-700">
                                        <CheckCircleOutlined className="text-green-500" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="order-1 lg:order-2 bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-8 h-96 flex items-center justify-center border border-gray-100">
                            {/* Placeholder for App Interface Image */}
                            <div className="text-gray-400 font-medium">App Dashboard Preview</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 h-96 flex items-center justify-center border border-gray-100">
                            {/* Placeholder for App Interface Image */}
                            <div className="text-gray-400 font-medium">Clinician Connection Preview</div>
                        </div>
                        <div>
                            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 text-2xl mb-6">
                                <UserOutlined />
                            </div>
                            <h3 className="text-3xl font-bold mb-4">Seamless Connection</h3>
                            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                Share your journey with your clinician automatically.
                                Less time explaining, more time growing.
                            </p>
                            <ul className="space-y-3">
                                {['Secure Data Sharing', 'Direct Messaging', 'Telehealth Integration'].map(item => (
                                    <li key={item} className="flex items-center gap-3 text-gray-700">
                                        <CheckCircleOutlined className="text-purple-500" /> {item}
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
                            <h4 className="text-xl font-bold mb-4">HealthOS</h4>
                            <p className="text-gray-400 max-w-sm">
                                Empowering better mental health through technology and human connection.
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
                        <p className="text-gray-500 text-sm">© 2026 HealthOS. All rights reserved.</p>
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
