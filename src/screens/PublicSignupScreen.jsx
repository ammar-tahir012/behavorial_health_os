import React, { useState } from 'react';
import { Button, Input, Form, message } from 'antd';
import { UserOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { analytics } from '../utils/analytics';
import { supabase } from '../supabaseClient';

const PublicSignupScreen = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setLoading(true);
        const email = values.email;
        const source = new URLSearchParams(window.location.search).get('source') || 'direct';

        try {
            // Analytics
            analytics.trackSignupComplete('pending_id'); // We'll update ID if we get one

            // Attempt to insert into public_users if table exists
            // Since we might not have the table yet, we'll try/catch this part and fall back to local storage for demo
            let userId = 'demo-user-' + Date.now();

            if (supabase) {
                const { data, error } = await supabase
                    .from('public_users')
                    .insert([{ email, referral_source: source, signup_date: new Date() }])
                    .select();

                if (error) {
                    console.warn('Supabase insert failed (table might be missing), using local storage fallback:', error);
                } else if (data && data[0]) {
                    userId = data[0].id;
                }
            }

            // Save simplistic session
            localStorage.setItem('healthos_public_user', JSON.stringify({ email, id: userId }));
            message.success("Welcome to HealthOS!");
            navigate('/my-dashboard');

        } catch (error) {
            console.error('Signup error:', error);
            message.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center">
                <div className="mb-8">
                    <span className="text-4xl">🌱</span>
                    <h2 className="text-3xl font-bold mt-4 mb-2 text-gray-900">Begin Your Journey</h2>
                    <p className="text-gray-500">Join thousands of others tracking their growth.</p>
                </div>

                <Form
                    name="public_signup"
                    onFinish={onFinish}
                    layout="vertical"
                    size="large"
                >
                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: 'Please input your email!' },
                            { type: 'email', message: 'Please enter a valid email!' }
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined className="text-gray-400" />}
                            placeholder="name@example.com"
                            className="rounded-full py-3 px-6 text-lg"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            block
                            className="h-14 text-lg rounded-full bg-primary hover:bg-primary-dark border-none shadow-lg shadow-primary/30 flex items-center justify-center gap-2"
                        >
                            Start Now <ArrowRightOutlined />
                        </Button>
                    </Form.Item>
                </Form>

                <p className="text-xs text-gray-400 mt-8">
                    By joining, you agree to our Terms of Service and Privacy Policy.
                    We respect your inbox.
                </p>

                <div className="mt-6 pt-6 border-t border-gray-100">
                    <a onClick={() => navigate('/login')} className="text-sm text-gray-500 hover:text-primary cursor-pointer">
                        Are you a clinician? Login here
                    </a>
                </div>
            </div>
        </div>
    );
};

export default PublicSignupScreen;
