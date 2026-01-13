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
                    <Card className="h-full shadow-2xl border-border rounded-xl bg-surface" bodyStyle={{ padding: '24px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h2 className="text-xl font-bold text-text m-0">Good Morning, Dr. Smith</h2>
                                    <p className="text-text/60 m-0">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                                </div>
                                <Avatar size={48} className="bg-primary/20 text-primary font-bold border border-primary/30 shadow-inner">DS</Avatar>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mb-4">
                                <Button type="primary" icon={<PlusOutlined />} className="bg-primary hover:bg-primary/90 border-none h-11" onClick={() => navigate('/note-editor')}>New Note</Button>
                                <Button icon={<UserOutlined />} className="h-11 bg-background border-border text-text/80 hover:text-primary hover:border-primary/50" onClick={() => navigate('/patients')}>Add Patient</Button>
                                <Button icon={<VideoCameraOutlined />} className="h-11 bg-background border-border text-text/80 hover:text-primary hover:border-primary/50" onClick={() => navigate('/telehealth')}>Telehealth</Button>
                                <Button icon={<FileTextOutlined />} className="h-11 bg-background border-border text-text/80 hover:text-primary hover:border-primary/50" onClick={() => navigate('/billing')}>Reports</Button>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-text/40 bg-background/50 p-2 rounded-lg border border-border/50">
                            <SafetyCertificateOutlined className="text-success" />
                            <span>HIPAA-secured • Last sync: 2 min ago</span>
                        </div>
                    </Card>
                </Col>

                {/* Card 2: Practice Overview */}
                <Col xs={24} md={12} lg={8}>
                    <Card className="h-full shadow-2xl border-border rounded-xl bg-surface" title={<span className="font-semibold text-text">Practice Overview</span>}>
                        <div className="flex flex-col gap-6">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-primary/10 text-primary rounded-lg">
                                        <TeamOutlined className="text-xl" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-text/60 m-0">Active Patients</p>
                                        <p className="text-xl font-bold text-text m-0">142</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-success/10 text-success rounded-lg">
                                        <ClockCircleOutlined className="text-xl" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-text/60 m-0">Appts Today</p>
                                        <p className="text-xl font-bold text-text m-0">8</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm text-text/60">Weekly Revenue Goal</span>
                                    <span className="text-sm font-bold text-text">$4,280 / $5,000</span>
                                </div>
                                <Progress percent={85} strokeColor="#2b66cb" trailColor="#1f2937" showInfo={false} />
                            </div>
                        </div>
                    </Card>
                </Col>

                {/* Card 3: Priority Alerts */}
                <Col xs={24} md={12} lg={8}>
                    <Card className="h-full shadow-2xl border-border rounded-xl bg-surface" title={<span className="font-semibold text-text">Priority Alerts</span>}>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 p-3 bg-error/10 border border-error/20 rounded-lg cursor-pointer hover:bg-error/20 transition-colors group">
                                <div className="w-2 h-2 rounded-full bg-error ring-2 ring-error/30"></div>
                                <span className="flex-1 text-sm text-error/90 font-medium">2 unsigned notes</span>
                                <RightOutlined className="text-xs text-error transition-transform group-hover:translate-x-1" />
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-warning/10 border border-warning/20 rounded-lg cursor-pointer hover:bg-warning/20 transition-colors group">
                                <div className="w-2 h-2 rounded-full bg-warning ring-2 ring-warning/30"></div>
                                <span className="flex-1 text-sm text-warning/90 font-medium">1 auth expiring soon</span>
                                <RightOutlined className="text-xs text-warning transition-transform group-hover:translate-x-1" />
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-primary/10 border border-primary/20 rounded-lg cursor-pointer hover:bg-primary/20 transition-colors group">
                                <div className="w-2 h-2 rounded-full bg-primary ring-2 ring-primary/30"></div>
                                <span className="flex-1 text-sm text-primary/90 font-medium">3 tasks due today</span>
                                <RightOutlined className="text-xs text-primary transition-transform group-hover:translate-x-1" />
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>

            {/* Middle Section: Schedule & Activity */}
            <Row gutter={[24, 24]}>
                <Col xs={24} lg={16}>
                    <Card
                        className="shadow-2xl border-border rounded-xl bg-surface h-full"
                        title={
                            <div className="flex items-center gap-2">
                                <CalendarOutlined className="text-primary" />
                                <span className="font-bold text-text">Today's Schedule</span>
                                <Badge count={3} className="bg-primary/20 text-primary ml-2 shadow-sm" />
                            </div>
                        }
                        extra={<Button type="link" className="text-primary hover:text-primary/80" onClick={() => navigate('/calendar')}>View Calendar</Button>}
                    >
                        <div className="space-y-4">
                            {appointments.map((apt) => (
                                <div
                                    key={apt.id}
                                    className={`relative flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-l-4 hover:bg-background/40 transition-all bg-background/20 ${apt.type === 'Initial Assessment' ? 'border-l-primary border-border/50' :
                                        apt.type === 'Therapy Session' ? 'border-l-success border-border/50' :
                                            'border-l-warning border-border/50'
                                        }`}
                                >
                                    {/* Left Side: Time & Patient */}
                                    <div className="flex items-start gap-4 mb-4 sm:mb-0">
                                        <div className="flex flex-col items-center min-w-[80px]">
                                            <span className="text-sm font-bold text-text">{apt.time}</span>
                                            <span className="text-xs text-text/40">{apt.duration}</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <Avatar size={48} className="bg-surface text-text/60 border border-border" icon={<UserOutlined />} />
                                            <div>
                                                <h3 className="text-base font-bold text-text m-0">{apt.patient}</h3>
                                                <div className="flex items-center gap-2 mt-1">
                                                    {apt.mode === 'telehealth' ?
                                                        <Tag icon={<VideoCameraOutlined />} className="m-0 border-none bg-primary/10 text-primary rounded-md px-2">Telehealth</Tag> :
                                                        <Tag icon={<EnvironmentOutlined />} className="m-0 border-none bg-success/10 text-success rounded-md px-2">In-person</Tag>
                                                    }
                                                    <span className="text-xs text-text/40">• {apt.type}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Side: Status & Action */}
                                    <div className="flex items-center gap-4 self-end sm:self-center">
                                        {apt.status === 'completed' && <Tag className="px-3 py-1 rounded-full border-none bg-success/10 text-success font-medium">COMPLETED</Tag>}
                                        {apt.status === 'in-progress' && <Tag className="px-3 py-1 rounded-full border-none bg-warning/10 text-warning font-medium">IN PROGRESS</Tag>}
                                        {apt.status === 'upcoming' && <Tag className="px-3 py-1 rounded-full border-none bg-primary/10 text-primary font-medium">UPCOMING</Tag>}

                                        <Button ghost className="border-primary text-primary hover:bg-primary/10 px-4" onClick={() => navigate(`/patients/${apt.id}`)}>View Chart</Button>
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
                        <Card className="shadow-2xl border-border rounded-xl flex-1 bg-surface" title={<span className="font-semibold text-text">Recent Patients</span>}>
                            <div className="flex flex-col gap-2">
                                {recentPatients.map((pt, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 hover:bg-background/60 rounded-lg cursor-pointer transition-colors group" onClick={() => navigate(`/patients/${pt.id}`)}>
                                        <div className="flex items-center gap-3">
                                            <Avatar size="small" className="bg-primary/20 text-primary border border-primary/30">{pt.name[0]}</Avatar>
                                            <div>
                                                <p className="text-sm font-medium text-text m-0">{pt.name}</p>
                                                <p className="text-xs text-text/40 m-0">Accessed {pt.date}</p>
                                            </div>
                                        </div>
                                        <RightOutlined className="text-xs text-text/20 group-hover:text-primary transition-colors" />
                                    </div>
                                ))}
                            </div>
                            <Button type="link" block className="mt-2 text-primary" onClick={() => navigate('/patients')}>View Directory</Button>
                        </Card>

                        {/* Quick Note */}
                        <Card className="shadow-2xl border-border rounded-xl bg-surface" title={<span className="font-semibold text-text">Quick Note</span>}>
                            <p className="text-xs text-text/40 mb-3">Select a template to start</p>
                            <div className="grid grid-cols-2 gap-2">
                                <Button size="small" className="bg-background border-border text-text/80 hover:text-primary hover:border-primary/50" onClick={() => navigate('/note-editor')}>Progress</Button>
                                <Button size="small" className="bg-background border-border text-text/80 hover:text-primary hover:border-primary/50" onClick={() => navigate('/note-editor')}>Intake</Button>
                                <Button size="small" className="bg-background border-border text-text/80 hover:text-primary hover:border-primary/50" onClick={() => navigate('/note-editor')}>Treatment</Button>
                                <Button size="small" className="bg-background border-border text-text/80 hover:text-primary hover:border-primary/50" onClick={() => navigate('/note-editor')}>Discharge</Button>
                            </div>
                        </Card>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default DashboardScreen;
