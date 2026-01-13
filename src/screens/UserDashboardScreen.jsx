import React, { useEffect, useState } from 'react';
import { Button, Card, Progress, Statistic, Row, Col, message } from 'antd';
import { CheckCircleOutlined, FireOutlined, BookOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { analytics } from '../utils/analytics';

import { supabase } from '../supabaseClient';

const UserDashboardScreen = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [streak, setStreak] = useState(0);

    useEffect(() => {
        // Simple auth check for MVP
        const storedUser = localStorage.getItem('healthos_public_user');
        if (!storedUser) {
            navigate('/signup');
            return;
        }
        setUser(JSON.parse(storedUser));
        analytics.trackPageView('/my-dashboard');
    }, [navigate]);

    const handleAction = async (actionType) => {
        analytics.trackUserAction(actionType);
        message.success(`Great job! Action "${actionType}" recorded.`);
        setStreak(prev => prev + 1);

        // Log to Supabase if possible
        if (supabase && user?.id) {
            await supabase.from('user_actions').insert([{
                user_id: user.id,
                action_type: actionType
            }]);
        }
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-12 font-sans">
            <div className="max-w-5xl mx-auto">
                <header className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Welcome back!</h1>
                        <p className="text-gray-500">Focus on your growth today.</p>
                    </div>
                    <div className="flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full font-bold">
                        <FireOutlined /> {streak} Day Streak
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <Card className="rounded-2xl shadow-sm border-gray-100">
                        <Statistic
                            title="Weekly Progress"
                            value={60}
                            suffix="%"
                            prefix={<CheckCircleOutlined className="text-green-500" />}
                        />
                        <Progress percent={60} status="active" strokeColor="#52c41a" className="mt-4" />
                    </Card>

                    <Card className="rounded-2xl shadow-sm border-gray-100 bg-gradient-to-br from-primary to-blue-500 text-white border-none">
                        <div className="text-white/80 text-sm font-medium uppercase tracking-wider mb-2">Next Step</div>
                        <h3 className="text-2xl font-bold text-white mb-4">Daily Reflection</h3>
                        <Button
                            ghost
                            shape="round"
                            size="large"
                            onClick={() => handleAction('start_journal')}
                        >
                            Start Now
                        </Button>
                    </Card>

                    <Card className="rounded-2xl shadow-sm border-gray-100">
                        <Statistic title="Journal Entries" value={12} prefix={<BookOutlined className="text-purple-500" />} />
                        <p className="text-gray-400 text-xs mt-4">Last entry: Yesterday</p>
                    </Card>
                </div>

                <h2 className="text-xl font-bold mb-6">Your Toolkit</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                    {['Breathing Exercise', 'Mood Check-in', 'Read Article', 'Connect Clinician'].map(action => (
                        <Button
                            key={action}
                            block
                            size="large"
                            className="h-24 text-lg font-medium rounded-xl whitespace-normal"
                            onClick={() => handleAction(action.toLowerCase().replace(' ', '_'))}
                        >
                            {action}
                        </Button>
                    ))}
                </div>



                <div className="text-center mt-12">
                    <Button type="link" danger onClick={() => {
                        localStorage.removeItem('healthos_public_user');
                        navigate('/');
                    }}>
                        Sign Out
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default UserDashboardScreen;
