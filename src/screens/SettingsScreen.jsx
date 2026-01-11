import React from 'react';
import { Tabs, Form, Input, Button, Switch, Card, Avatar, Select, message } from 'antd';
import { UserOutlined, BellOutlined, SafetyOutlined, BuildOutlined } from '@ant-design/icons';

const SettingsScreen = () => {
    const onFinish = (values) => {
        message.success('Settings updated successfully');
    };

    return (
        <div className="h-full max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-text">Settings</h1>

            <Card className="shadow-sm">
                <Tabs
                    tabPosition="left"
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
                                    <Form layout="vertical" onFinish={onFinish} initialValues={{ name: 'Dr. Sarah Smith', email: 'sarah.smith@healthos.com', role: 'Clinical Director' }}>
                                        <Form.Item label="Full Name" name="name"><Input /></Form.Item>
                                        <Form.Item label="Email" name="email"><Input /></Form.Item>
                                        <Form.Item label="Role" name="role"><Input disabled /></Form.Item>
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
                                    <Button>Change Password</Button>
                                    <div className="mt-4">
                                        <p className="font-semibold text-red-500">Two-Factor Authentication</p>
                                        <Switch defaultChecked /> <span className="ml-2">Enabled</span>
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
        </div>
    );
};

export default SettingsScreen;
