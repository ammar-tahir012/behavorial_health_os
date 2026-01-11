import React, { useState } from 'react';
import { Form, Input, Button, Card, Alert, message } from 'antd';
import { UserOutlined, LockOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginScreen = () => {
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setLoading(true);
        const { error } = await login(values.email, values.password);

        if (error) {
            message.error(error.message);
        } else {
            message.success('Login successful');
            navigate('/dashboard');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <Card className="w-full max-w-md shadow-lg border-t-4 border-t-primary">
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                            <SafetyCertificateOutlined className="text-3xl text-primary" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-text">Behavioral Health OS</h1>
                    <p className="text-gray-500 mt-2">Secure Clinician Access</p>
                </div>

                <Alert
                    message="HIPAA Compliance Notice"
                    description="This system contains Protected Health Information (PHI). access is restricted to authorized personnel only."
                    type="warning"
                    showIcon
                    className="mb-6 text-xs"
                />

                <Form
                    name="login"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    layout="vertical"
                    size="large"
                >
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Email Address" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="w-full bg-primary" loading={loading}>
                            Sign In
                        </Button>
                    </Form.Item>
                </Form>

                <div className="text-center mt-4">
                    Don't have an account? <Link to="/signup" className="text-primary hover:underline">Sign up</Link>
                </div>

                <div className="text-center text-sm text-gray-400 mt-6">
                    v2.5.0 • 256-bit Encryption
                </div>
            </Card>
        </div>
    );
};

export default LoginScreen;
