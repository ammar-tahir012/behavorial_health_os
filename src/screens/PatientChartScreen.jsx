import React from 'react';
import { Tabs, Card, Descriptions, Tag, Button, List, Timeline } from 'antd';
import { ArrowLeftOutlined, EditOutlined, MedicineBoxOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';

const PatientChartScreen = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const items = [
        {
            key: '1',
            label: 'Overview',
            children: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card title={<span className="text-text font-semibold">Demographics</span>} bordered={false} className="shadow-xl bg-surface/50 border border-border/50 rounded-xl">
                        <Descriptions column={1} size="small">
                            <Descriptions.Item label={<span className="text-text/60">Age</span>}><span className="text-text">40</span></Descriptions.Item>
                            <Descriptions.Item label={<span className="text-text/60">Gender</span>}><span className="text-text">Female</span></Descriptions.Item>
                            <Descriptions.Item label={<span className="text-text/60">Phone</span>}><span className="text-text">(555) 123-4567</span></Descriptions.Item>
                            <Descriptions.Item label={<span className="text-text/60">Address</span>}><span className="text-text">123 Main St, Springfield</span></Descriptions.Item>
                            <Descriptions.Item label={<span className="text-text/60">Emergency Contact</span>}><span className="text-text">John Doe (Husband)</span></Descriptions.Item>
                        </Descriptions>
                    </Card>
                    <Card title={<span className="text-text font-semibold">Diagnosis & Allergies</span>} bordered={false} className="shadow-xl bg-surface/50 border border-border/50 rounded-xl">
                        <div className="mb-6">
                            <h4 className="font-semibold mb-3 text-text/80">Active Diagnoses</h4>
                            <div className="flex flex-wrap gap-2">
                                <Tag color="error" className="bg-error/10 border-error/20 text-error-content rounded-md">Major Depressive Disorder</Tag>
                                <Tag color="warning" className="bg-warning/10 border-warning/20 text-warning-content rounded-md">Generalized Anxiety</Tag>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-3 text-text/80">Allergies</h4>
                            <div className="flex flex-wrap gap-2">
                                <Tag color="magenta" className="rounded-md">Penicillin</Tag>
                                <Tag color="magenta" className="rounded-md">Sulfa</Tag>
                            </div>
                        </div>
                    </Card>
                    <Card title={<span className="text-text font-semibold">Recent Activity</span>} bordered={false} className="shadow-xl bg-surface/50 border border-border/50 rounded-xl md:col-span-2">
                        <Timeline
                            className="text-text mt-2"
                            items={[
                                {
                                    color: 'green',
                                    children: <span className="text-text/80">Completed Therapy Session - 10/24/2025</span>,
                                },
                                {
                                    color: 'blue',
                                    children: <span className="text-text/80">Medication Refill: Zoloft 50mg - 10/10/2025</span>,
                                },
                                {
                                    color: 'gray',
                                    children: <span className="text-text/40 italic">Initial Assessment - 09/15/2025</span>,
                                },
                            ]}
                        />
                    </Card>
                </div>
            ),
        },
        {
            key: '2',
            label: 'Clinical Notes',
            children: (
                <Card className="shadow-xl bg-surface/50 border border-border/50 rounded-xl">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-lg text-text">Note History</h3>
                        <Button type="primary" icon={<EditOutlined />} onClick={() => navigate('/note-editor')}>New Note</Button>
                    </div>
                    <List
                        itemLayout="horizontal"
                        className="text-text"
                        dataSource={[
                            { date: 'Oct 24, 2025', type: 'Progress Note', provider: 'Dr. Smith' },
                            { date: 'Oct 10, 2025', type: 'Med Management', provider: 'Dr. Smith' },
                        ]}
                        renderItem={item => (
                            <List.Item actions={[<a key="view" className="text-primary hover:text-primary/80">View</a>]} className="border-b border-border/30 hover:bg-white/5 transition-colors px-4 rounded-lg">
                                <List.Item.Meta
                                    avatar={<div className="bg-primary/10 text-primary p-2 rounded-lg border border-primary/20"><EditOutlined /></div>}
                                    title={<span className="text-text font-medium">{item.date}</span>}
                                    description={<span className="text-text/40">{`${item.type} by ${item.provider}`}</span>}
                                />
                            </List.Item>
                        )}
                    />
                </Card>
            ),
        },
        {
            key: '3',
            label: 'Medications',
            children: (
                <Card className="shadow-xl bg-surface/50 border border-border/50 rounded-xl">
                    <List
                        itemLayout="horizontal"
                        className="text-text"
                        dataSource={[
                            { name: 'Sertraline (Zoloft)', dosage: '50mg daily', status: 'Active' },
                            { name: 'Lorazepam', dosage: '0.5mg PRN', status: 'Active' },
                        ]}
                        renderItem={item => (
                            <List.Item className="border-b border-border/30 hover:bg-white/5 transition-colors px-4 rounded-lg">
                                <List.Item.Meta
                                    avatar={<MedicineBoxOutlined className="text-2xl text-primary" />}
                                    title={<span className="text-text font-medium">{item.name}</span>}
                                    description={<span className="text-text/40">{item.dosage}</span>}
                                />
                                <Tag color="success" className="bg-success/10 border-success/20 text-success-content rounded-full px-3">Active</Tag>
                            </List.Item>
                        )}
                    />
                </Card>
            ),
        },
    ];

    return (
        <div className="h-full flex flex-col">
            <div className="mb-6 flex items-center gap-4">
                <Button
                    icon={<ArrowLeftOutlined />}
                    onClick={() => navigate('/patients')}
                    className="bg-surface border-border text-text hover:text-primary hover:border-primary/50"
                />
                <div>
                    <h1 className="text-2xl font-bold m-0 text-text">Sarah Johnson</h1>
                    <span className="text-text/40">PT-1001 • DOB: 04/12/1985 (40y)</span>
                </div>
            </div>

            <div className="flex-1 bg-surface rounded-xl p-6 shadow-2xl border border-border">
                <Tabs defaultActiveKey="1" items={items} className="theme-dark-tabs" />
            </div>
        </div>
    );
};

export default PatientChartScreen;
