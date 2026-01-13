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
import logo from '../assets/logo.jpg';


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
        <AntLayout className="h-screen bg-background text-text">
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                className="bg-secondary border-r border-border"
                theme="dark"
                width={250}
            >
                <div className="flex items-center justify-center py-6 border-b border-border overflow-hidden">
                    <img
                        src={logo}
                        alt="BHAOS Logo"
                        className={`transition-all duration-300 mix-blend-screen brightness-110 contrast-125 ${collapsed ? 'h-12 w-12' : 'h-28 w-auto'}`}
                    />
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[location.pathname]}
                    items={items}
                    onClick={({ key }) => navigate(key)}
                    className="border-none mt-2 bg-transparent"
                />
            </Sider>
            <AntLayout className="bg-background">
                <Header className="bg-surface px-4 border-b border-border flex items-center justify-between h-16">
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        className="text-lg w-10 h-10 flex items-center justify-center text-text hover:text-primary transition-colors"
                    />
                    <div className="flex items-center gap-4">
                        <span className="text-text font-medium whitespace-nowrap opacity-90">
                            {user?.user_metadata?.full_name || user?.email || 'User'}
                        </span>
                        <Dropdown overlay={userMenu} placement="bottomRight">
                            <Avatar icon={<UserOutlined />} className="bg-primary cursor-pointer shadow-md" />
                        </Dropdown>
                    </div>
                </Header>
                <Content className="m-4 p-6 bg-surface rounded-lg shadow-xl overflow-auto border border-border">
                    <Outlet />
                </Content>
            </AntLayout>
        </AntLayout>
    );
};

export default Layout;
