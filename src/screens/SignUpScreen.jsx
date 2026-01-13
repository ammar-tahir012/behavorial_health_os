import React, { useState } from 'react';
import { Form, Input, Button, Card, Alert, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.jpg';


const SignUpScreen = () => {
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setLoading(true);
        const { error } = await signup(values.email, values.password, {
            full_name: values.fullName,
            role: 'staff' // Default role
        });

        if (error) {
            message.error(error.message);
        } else {
            message.success('Registration successful! Please check your email to verify your account.');
            navigate('/login');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <Card className="w-full max-w-md shadow-2xl border-t-4 border-t-primary bg-surface border-border">
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-6">
                        <img src={logo} alt="BHAOS Logo" className="h-32 w-auto mix-blend-screen brightness-110 contrast-125" />
                    </div>
                    <p className="text-text/60 mt-2 font-medium">Join BHAOS Provider Network</p>
                </div>

                <Form
                    name="signup"
                    onFinish={onFinish}
                    layout="vertical"
                    size="large"
                >
                    <Form.Item
                        name="fullName"
                        rules={[{ required: true, message: 'Please input your full name!' }]}
                    >
                        <Input prefix={<UserOutlined className="text-text/40" />} placeholder="Full Name" className="bg-background border-border text-text" />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: 'Please input your email!' },
                            { type: 'email', message: 'Please enter a valid email!' }
                        ]}
                    >
                        <Input prefix={<MailOutlined className="text-text/40" />} placeholder="Email Address" className="bg-background border-border text-text" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            { required: true, message: 'Please input your password!' },
                            { min: 6, message: 'Password must be at least 6 characters' }
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined className="text-text/40" />} placeholder="Password" className="bg-background border-border text-text" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="w-full bg-primary hover:bg-primary/90 border-none h-12 text-base font-semibold" loading={loading}>
                            Sign Up
                        </Button>
                    </Form.Item>
                </Form>

                <div className="text-center mt-4 text-text/60">
                    Already have an account? <Link to="/login" className="text-primary hover:underline">Log in</Link>
                </div>
            </Card>
        </div>
    );
};

export default SignUpScreen;
