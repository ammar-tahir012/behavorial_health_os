import React from 'react';
import { Card, Row, Col, Badge, Button, Avatar, Tag, Progress, Statistic } from 'antd';
import {
    ClockCircleOutlined,
    UserOutlined,
    FileTextOutlined,
    VideoCameraOutlined,
    EnvironmentOutlined,
    PlusOutlined,
    RightOutlined,
    BellOutlined,
    SafetyCertificateOutlined,
    CalendarOutlined,
    RiseOutlined,
    TeamOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const DashboardScreen = () => {
    const navigate = useNavigate();

    // Mock Data
    const appointments = [
        {
            id: 1,
            time: '09:00 AM',
            duration: '60 min',
            patient: 'Sarah Johnson',
            type: 'Initial Assessment',
            mode: 'telehealth',
            status: 'completed',
            image: null
        },
        {
            id: 2,
            time: '10:30 AM',
            duration: '45 min',
            patient: 'Michael Chen',
            type: 'Follow-up',
            mode: 'in-person',
            status: 'in-progress',
            image: null
        },
        {
            id: 3,
            time: '01:00 PM',
            duration: '60 min',
            patient: 'Emily Davis',
            type: 'Therapy Session',
            mode: 'telehealth',
            status: 'upcoming',
            image: null
        },
    ];

    const recentPatients = [
        { name: 'James Wilson', id: 'PT-1004', date: 'Yesterday' },
        { name: 'Linda Martinez', id: 'PT-1005', date: 'Oct 22' },
        { name: 'Robert Taylor', id: 'PT-1006', date: 'Oct 20' },
    ];

    return (
        <div className="space-y-6">
            {/* Top Row: Overview Cards */}
            <Row gutter={[24, 24]}>
                {/* Card 1: Welcome & Actions */}
                <Col xs={24} lg={8}>
                    <Card className="h-full shadow-md border-border rounded-xl" bodyStyle={{ padding: '24px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 m-0">Good Morning, Dr. Smith</h2>
                                    <p className="text-gray-500 m-0">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                                </div>
                                <Avatar size={48} className="bg-primary/10 text-primary font-bold">DS</Avatar>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mb-4">
                                <Button type="primary" icon={<PlusOutlined />} className="bg-primary h-10" onClick={() => navigate('/note-editor')}>New Note</Button>
                                <Button icon={<UserOutlined />} className="h-10" onClick={() => navigate('/patients')}>Add Patient</Button>
                                <Button icon={<VideoCameraOutlined />} className="h-10" onClick={() => navigate('/telehealth')}>Start Session</Button>
                                <Button icon={<FileTextOutlined />} className="h-10" onClick={() => navigate('/billing')}>Reports</Button>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-gray-400 bg-gray-50 p-2 rounded-lg border border-gray-100">
                            <SafetyCertificateOutlined className="text-success" />
                            <span>HIPAA-secured • Last sync: 2 min ago</span>
                        </div>
                    </Card>
                </Col>

                {/* Card 2: Practice Overview */}
                <Col xs={24} md={12} lg={8}>
                    <Card className="h-full shadow-md border-border rounded-xl" title={<span className="font-semibold text-gray-800">Practice Overview</span>}>
                        <div className="flex flex-col gap-6">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-50 text-primary rounded-lg">
                                        <TeamOutlined className="text-xl" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 m-0">Active Patients</p>
                                        <p className="text-xl font-bold text-gray-900 m-0">142</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-green-50 text-success rounded-lg">
                                        <ClockCircleOutlined className="text-xl" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 m-0">Appts Today</p>
                                        <p className="text-xl font-bold text-gray-900 m-0">8</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm text-gray-500">Weekly Revenue Goal</span>
                                    <span className="text-sm font-bold text-gray-900">$4,280 / $5,000</span>
                                </div>
                                <Progress percent={85} strokeColor="#2563EB" trailColor="#F1F5F9" showInfo={false} />
                            </div>
                        </div>
                    </Card>
                </Col>

                {/* Card 3: Priority Alerts */}
                <Col xs={24} md={12} lg={8}>
                    <Card className="h-full shadow-md border-border rounded-xl" title={<span className="font-semibold text-gray-800">Priority Alerts</span>}>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 p-3 bg-red-50 border border-red-100 rounded-lg cursor-pointer hover:bg-red-100 transition-colors">
                                <div className="w-2 h-2 rounded-full bg-error"></div>
                                <span className="flex-1 text-sm text-gray-700 font-medium">2 unsigned notes</span>
                                <RightOutlined className="text-xs text-error" />
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-yellow-50 border border-yellow-100 rounded-lg cursor-pointer hover:bg-yellow-100 transition-colors">
                                <div className="w-2 h-2 rounded-full bg-warning"></div>
                                <span className="flex-1 text-sm text-gray-700 font-medium">1 auth expiring soon</span>
                                <RightOutlined className="text-xs text-warning" />
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-100 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors">
                                <div className="w-2 h-2 rounded-full bg-primary"></div>
                                <span className="flex-1 text-sm text-gray-700 font-medium">3 tasks due today</span>
                                <RightOutlined className="text-xs text-primary" />
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>

            {/* Middle Section: Schedule & Activity */}
            <Row gutter={[24, 24]}>
                <Col xs={24} lg={16}>
                    <Card
                        className="shadow-md border-border rounded-xl h-full"
                        title={
                            <div className="flex items-center gap-2">
                                <CalendarOutlined className="text-primary" />
                                <span className="font-bold text-gray-800">Today's Schedule</span>
                                <Badge count={3} className="bg-blue-100 text-primary ml-2" />
                            </div>
                        }
                        extra={<Button type="link" onClick={() => navigate('/calendar')}>View Full Calendar</Button>}
                    >
                        <div className="space-y-4">
                            {appointments.map((apt) => (
                                <div
                                    key={apt.id}
                                    className={`relative flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-l-4 hover:shadow-md transition-shadow bg-white ${apt.type === 'Initial Assessment' ? 'border-l-secondary border-gray-100' :
                                            apt.type === 'Therapy Session' ? 'border-l-primary border-gray-100' :
                                                'border-l-success border-gray-100'
                                        }`}
                                >
                                    {/* Left Side: Time & Patient */}
                                    <div className="flex items-start gap-4 mb-4 sm:mb-0">
                                        <div className="flex flex-col items-center min-w-[80px]">
                                            <span className="text-sm font-bold text-gray-900">{apt.time}</span>
                                            <span className="text-xs text-gray-400">{apt.duration}</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <Avatar size={48} className="bg-gray-100 text-gray-600 border border-gray-200" icon={<UserOutlined />} />
                                            <div>
                                                <h3 className="text-base font-bold text-gray-900 m-0">{apt.patient}</h3>
                                                <div className="flex items-center gap-2 mt-1">
                                                    {apt.mode === 'telehealth' ?
                                                        <Tag icon={<VideoCameraOutlined />} className="m-0 border-none bg-blue-50 text-blue-700 rounded-md px-2">Telehealth</Tag> :
                                                        <Tag icon={<EnvironmentOutlined />} className="m-0 border-none bg-green-50 text-green-700 rounded-md px-2">In-person</Tag>
                                                    }
                                                    <span className="text-xs text-gray-400">• {apt.type}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Side: Status & Action */}
                                    <div className="flex items-center gap-4 self-end sm:self-center">
                                        {apt.status === 'completed' && <Tag className="px-3 py-1 rounded-full border-none bg-green-100 text-green-800 font-medium">COMPLETED</Tag>}
                                        {apt.status === 'in-progress' && <Tag className="px-3 py-1 rounded-full border-none bg-amber-100 text-amber-800 font-medium">IN PROGRESS</Tag>}
                                        {apt.status === 'upcoming' && <Tag className="px-3 py-1 rounded-full border-none bg-blue-100 text-blue-800 font-medium">UPCOMING</Tag>}

                                        <Button onClick={() => navigate(`/patients/${apt.id}`)}>View Chart</Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </Col>

                {/* Bottom Right Column */}
                <Col xs={24} lg={8}>
                    <div className="flex flex-col gap-6 h-full">
                        {/* Recent Pacients */}
                        <Card className="shadow-md border-border rounded-xl flex-1" title={<span className="font-semibold text-gray-800">Recent Patients</span>}>
                            <div className="flex flex-col gap-2">
                                {recentPatients.map((pt, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors" onClick={() => navigate(`/patients/${pt.id}`)}>
                                        <div className="flex items-center gap-3">
                                            <Avatar size="small" className="bg-secondary/10 text-secondary">{pt.name[0]}</Avatar>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900 m-0">{pt.name}</p>
                                                <p className="text-xs text-gray-400 m-0">Accessed {pt.date}</p>
                                            </div>
                                        </div>
                                        <RightOutlined className="text-xs text-gray-300" />
                                    </div>
                                ))}
                            </div>
                            <Button type="link" block className="mt-2" onClick={() => navigate('/patients')}>View All Patients</Button>
                        </Card>

                        {/* Quick Stats or Docs */}
                        <Card className="shadow-md border-border rounded-xl" title={<span className="font-semibold text-gray-800">Quick Note</span>}>
                            <p className="text-xs text-gray-500 mb-3">Select a template to start</p>
                            <div className="grid grid-cols-2 gap-2">
                                <Button size="small" onClick={() => navigate('/note-editor')}>Progress Note</Button>
                                <Button size="small" onClick={() => navigate('/note-editor')}>Intake Assessment</Button>
                                <Button size="small" onClick={() => navigate('/note-editor')}>Treatment Plan</Button>
                                <Button size="small" onClick={() => navigate('/note-editor')}>Discharge</Button>
                            </div>
                        </Card>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default DashboardScreen;
