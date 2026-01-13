import React, { useState } from 'react';
import { Form, Input, Button, Card, Alert, message } from 'antd';
import { UserOutlined, LockOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.jpg';


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
            <Card className="w-full max-w-md shadow-2xl border-t-4 border-t-primary bg-surface border-border">
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-6">
                        <img src={logo} alt="BHAOS Logo" className="h-32 w-auto mix-blend-screen brightness-110 contrast-125" />
                    </div>
                    <p className="text-text/60 mt-2 font-medium">Secure Clinician Access</p>
                </div>

                <Alert
                    title="HIPAA Compliance Notice"
                    description="This system contains Protected Health Information (PHI). access is restricted to authorized personnel only."
                    type="warning"
                    showIcon
                    className="mb-6 text-xs bg-warning/10 border-warning/20 text-warning-content"
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
                        <Input prefix={<UserOutlined className="text-text/40" />} placeholder="Email Address" className="bg-background border-border text-text" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password prefix={<LockOutlined className="text-text/40" />} placeholder="Password" className="bg-background border-border text-text" />
                    </Form.Item>

                    <div className="flex justify-end mb-4">
                        <Link to="/forgot-password" className="text-sm text-primary hover:text-primary/80 transition-colors">
                            Forgot Password?
                        </Link>
                    </div>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="w-full bg-primary hover:bg-primary/90 border-none h-12 text-base font-semibold" loading={loading}>
                            Sign In
                        </Button>
                    </Form.Item>
                </Form>

                <div className="text-center mt-4 text-text/60">
                    Don't have an account? <Link to="/clinician-signup" className="text-primary hover:underline">Clinician Sign up</Link>
                </div>

                <div className="text-center text-sm text-text/40 mt-6 pt-6 border-t border-border">
                    v2.5.0 • 256-bit Encryption
                </div>
            </Card>
        </div >
    );
};

export default LoginScreen;
