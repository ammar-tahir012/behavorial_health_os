import React, { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { MailOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { supabase } from '../supabaseClient';
import { useNavigate, Link } from 'react-router-dom';

const ForgotPasswordScreen = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setLoading(true);
        const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
            redirectTo: window.location.origin + '/reset-password',
        });

        if (error) {
            message.error(error.message);
        } else {
            message.success('Password reset email sent! Check your inbox.');
            setTimeout(() => navigate('/login'), 3000);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <Card className="w-full max-w-md shadow-lg border-t-4 border-t-primary">
                <div className="mb-6">
                    <Link to="/login" className="text-gray-500 hover:text-primary flex items-center gap-2">
                        <ArrowLeftOutlined /> Back to Login
                    </Link>
                </div>

                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-text">Reset Password</h1>
                    <p className="text-gray-500 mt-2">Enter your email to receive recovery instructions</p>
                </div>

                <Form
                    name="forgot-password"
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
                        <Input prefix={<MailOutlined />} placeholder="Email Address" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="w-full bg-primary" loading={loading}>
                            Send Reset Link
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default ForgotPasswordScreen;
