import React, { useState, useEffect } from 'react';
import { Tabs, Form, Input, Button, Switch, Card, Avatar, Select, message, Modal } from 'antd';
import { UserOutlined, BellOutlined, SafetyOutlined, BuildOutlined } from '@ant-design/icons';
import MFAEnrollment from '../components/MFAEnrollment';
import { supabase } from '../supabaseClient';
import { useAuth } from '../context/AuthContext';

const SettingsScreen = () => {
    const { user } = useAuth();
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [passwordForm] = Form.useForm();
    const [profileForm] = Form.useForm();

    const onFinishProfile = async (values) => {
        const { error } = await supabase.auth.updateUser({
            data: { full_name: values.name }
        });

        if (error) {
            message.error(error.message);
        } else {
            message.success('Profile updated successfully');
        }
    };

    const onChangePassword = async (values) => {
        setPasswordLoading(true);
        const { error } = await supabase.auth.updateUser({ password: values.newPassword });

        if (error) {
            message.error(error.message);
        } else {
            message.success('Password updated successfully');
            setIsPasswordModalOpen(false);
            passwordForm.resetFields();
        }
        setPasswordLoading(false);
    };

    // Initial values for the form
    const initialProfileValues = {
        name: user?.user_metadata?.full_name || '',
        email: user?.email || '',
        role: user?.user_metadata?.role || 'Staff'
    };

    return (
        <div className="h-full max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-text">Settings</h1>

            <Card className="shadow-sm">
                <Tabs
                    tabPlacement="left"
                    items={[
                        {
                            label: <span><UserOutlined /> Profile</span>,
                            key: '1',
                            children: (
                                <div className="p-4">
                                    <div className="flex items-center gap-4 mb-6">
                                        <Avatar size={64} icon={<UserOutlined />} className="bg-primary" />
                                        <Button>Change Photo</Button>
                                    </div>
                                    <Form
                                        layout="vertical"
                                        onFinish={onFinishProfile}
                                        initialValues={initialProfileValues}
                                        form={profileForm}
                                    >
                                        <Form.Item label="Full Name" name="name">
                                            <Input placeholder="Enter your full name" />
                                        </Form.Item>
                                        <Form.Item label="Email" name="email">
                                            <Input disabled />
                                        </Form.Item>
                                        <Form.Item label="Role" name="role">
                                            <Input disabled className="capitalize" />
                                        </Form.Item>
                                        <Button type="primary" htmlType="submit">Save Changes</Button>
                                    </Form>
                                </div>
                            ),
                        },
                        {
                            label: <span><BellOutlined /> Notification</span>,
                            key: '2',
                            children: (
                                <div className="p-4">
                                    <Form layout="vertical">
                                        <Form.Item label="Email Notifications">
                                            <div className="flex justify-between">
                                                <span>New appointment requests</span>
                                                <Switch defaultChecked />
                                            </div>
                                        </Form.Item>
                                        <Form.Item>
                                            <div className="flex justify-between">
                                                <span>Patient messages</span>
                                                <Switch defaultChecked />
                                            </div>
                                        </Form.Item>
                                        <Form.Item>
                                            <div className="flex justify-between">
                                                <span>Task reminders</span>
                                                <Switch />
                                            </div>
                                        </Form.Item>
                                    </Form>
                                </div>
                            ),
                        },
                        {
                            label: <span><SafetyOutlined /> Security</span>,
                            key: '3',
                            children: (
                                <div className="p-4">
                                    <h3 className="text-lg font-bold mb-4">Account Security</h3>
                                    <div className="mb-8">
                                        <Button onClick={() => setIsPasswordModalOpen(true)}>Change Password</Button>
                                    </div>

                                    <div className="border-t pt-6">
                                        <h4 className="font-semibold text-gray-800 mb-2">Two-Factor Authentication (HIPAA Requirement)</h4>
                                        <p className="text-gray-500 mb-4 text-sm">
                                            Protect patient data by requiring a code from your phone when logging in.
                                        </p>
                                        <MFAEnrollment onComplete={() => message.success('MFA Setup Complete!')} />
                                    </div>
                                </div>
                            ),
                        },
                        {
                            label: <span><BuildOutlined /> Practice</span>,
                            key: '4',
                            children: (
                                <div className="p-4">
                                    <Form layout="vertical">
                                        <Form.Item label="Time Zone">
                                            <Select defaultValue="est">
                                                <Select.Option value="est">Eastern Time (US)</Select.Option>
                                                <Select.Option value="pst">Pacific Time (US)</Select.Option>
                                            </Select>
                                        </Form.Item>
                                        <Form.Item label="Default Session Duration"><Input suffix="min" defaultValue="50" /></Form.Item>
                                    </Form>
                                </div>
                            ),
                        }
                    ]}
                />
            </Card>

            <Modal
                title="Change Password"
                open={isPasswordModalOpen}
                onCancel={() => setIsPasswordModalOpen(false)}
                footer={null}
            >
                <Form
                    form={passwordForm}
                    layout="vertical"
                    onFinish={onChangePassword}
                >
                    <Form.Item
                        name="newPassword"
                        label="New Password"
                        rules={[
                            { required: true, message: 'Please enter new password' },
                            { min: 12, message: 'Password must be at least 12 characters' }
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="confirmPassword"
                        label="Confirm New Password"
                        dependencies={['newPassword']}
                        rules={[
                            { required: true, message: 'Please confirm your password' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('newPassword') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={passwordLoading} className="w-full">
                            Update Password
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default SettingsScreen;
