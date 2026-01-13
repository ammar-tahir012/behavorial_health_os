import React, { useState } from 'react';
import { Layout as AntLayout, Menu, Button, Avatar, Dropdown, message } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    AppstoreOutlined,
    TeamOutlined,
    CalendarOutlined,
    VideoCameraOutlined,
    CheckSquareOutlined,
    DollarOutlined,
    SettingOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    LogoutOutlined,
    FileTextOutlined
} from '@ant-design/icons';

const { Header, Sider, Content } = AntLayout;

const Layout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const items = [
        { key: '/dashboard', icon: <AppstoreOutlined />, label: 'Dashboard' },
        { key: '/patients', icon: <TeamOutlined />, label: 'Patients' },
        { key: '/calendar', icon: <CalendarOutlined />, label: 'Calendar' },
        { key: '/note-editor', icon: <FileTextOutlined />, label: 'Notes' },
        { key: '/telehealth', icon: <VideoCameraOutlined />, label: 'Telehealth' },
        { key: '/tasks', icon: <CheckSquareOutlined />, label: 'Tasks' },
        { key: '/billing', icon: <DollarOutlined />, label: 'Billing' },
        { key: '/settings', icon: <SettingOutlined />, label: 'Settings' },
    ];

    const handleLogout = async () => {
        const { error } = await logout();
        if (error) {
            message.error(error.message);
        } else {
            message.success('Logged out successfully');
            navigate('/login');
        }
    };

    const userMenu = (
        <Menu>
            <Menu.Item key="profile" icon={<UserOutlined />} onClick={() => navigate('/settings')}>
                Profile
            </Menu.Item>
            <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
                Logout
            </Menu.Item>
        </Menu>
    );

    return (
        <AntLayout className="h-screen">
            <Sider trigger={null} collapsible collapsed={collapsed} className="bg-white border-r border-border" theme="light" width={250}>
                <div className="flex items-center justify-center py-6 border-b border-border">
                    {!collapsed ? (
                        <h1 className="text-xl font-bold text-primary">HealthOS</h1>
                    ) : (
                        <h1 className="text-xl font-bold text-primary">H</h1>
                    )}
                </div>
                <Menu
                    mode="inline"
                    selectedKeys={[location.pathname]}
                    items={items}
                    onClick={({ key }) => navigate(key)}
                    className="border-none mt-2"
                />
            </Sider>
            <AntLayout>
                <Header className="bg-white px-4 border-b border-border flex items-center justify-between" style={{ background: '#fff' }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        className="text-lg w-16 h-16"
                    />
                    <div className="flex items-center gap-4">
                        <span className="text-gray-600 font-medium whitespace-nowrap">
                            {user?.user_metadata?.full_name || user?.email || 'User'}
                        </span>
                        <Dropdown overlay={userMenu} placement="bottomRight">
                            <Avatar icon={<UserOutlined />} className="bg-primary cursor-pointer shadow-sm" />
                        </Dropdown>
                    </div>
                </Header>
                <Content className="m-4 p-6 bg-white rounded-lg shadow-sm overflow-auto">
                    <Outlet />
                </Content>
            </AntLayout>
        </AntLayout>
    );
};

export default Layout;
