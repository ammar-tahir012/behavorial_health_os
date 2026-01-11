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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card title="Demographics" bordered={false} className="shadow-sm">
                        <Descriptions column={1} size="small">
                            <Descriptions.Item label="Age">40</Descriptions.Item>
                            <Descriptions.Item label="Gender">Female</Descriptions.Item>
                            <Descriptions.Item label="Phone">(555) 123-4567</Descriptions.Item>
                            <Descriptions.Item label="Address">123 Main St, Springfield</Descriptions.Item>
                            <Descriptions.Item label="Emergency Contact">John Doe (Husband)</Descriptions.Item>
                        </Descriptions>
                    </Card>
                    <Card title="Diagnosis & Allergies" bordered={false} className="shadow-sm">
                        <div className="mb-4">
                            <h4 className="font-semibold mb-2">Active Diagnoses</h4>
                            <div className="flex gap-2">
                                <Tag color="red">Major Depressive Disorder</Tag>
                                <Tag color="orange">Generalized Anxiety</Tag>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2">Allergies</h4>
                            <Tag color="magenta">Penicillin</Tag>
                            <Tag color="magenta">Sulfa</Tag>
                        </div>
                    </Card>
                    <Card title="Recent Activity" bordered={false} className="shadow-sm md:col-span-2">
                        <Timeline
                            items={[
                                {
                                    color: 'green',
                                    children: 'Completed Therapy Session - 10/24/2025',
                                },
                                {
                                    color: 'blue',
                                    children: 'Medication Refill: Zoloft 50mg - 10/10/2025',
                                },
                                {
                                    color: 'gray',
                                    children: 'Initial Assessment - 09/15/2025',
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
                <Card className="shadow-sm">
                    <div className="flex justify-between mb-4">
                        <h3 className="font-bold text-lg">Note History</h3>
                        <Button type="primary" icon={<EditOutlined />} onClick={() => navigate('/note-editor')}>New Note</Button>
                    </div>
                    <List
                        itemLayout="horizontal"
                        dataSource={[
                            { date: 'Oct 24, 2025', type: 'Progress Note', provider: 'Dr. Smith' },
                            { date: 'Oct 10, 2025', type: 'Med Management', provider: 'Dr. Smith' },
                        ]}
                        renderItem={item => (
                            <List.Item actions={[<a key="view">View</a>]}>
                                <List.Item.Meta
                                    avatar={<div className="bg-gray-100 p-2 rounded"><EditOutlined /></div>}
                                    title={item.date}
                                    description={`${item.type} by ${item.provider}`}
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
                <Card className="shadow-sm">
                    <List
                        itemLayout="horizontal"
                        dataSource={[
                            { name: 'Sertraline (Zoloft)', dosage: '50mg daily', status: 'Active' },
                            { name: 'Lorazepam', dosage: '0.5mg PRN', status: 'Active' },
                        ]}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<MedicineBoxOutlined className="text-2xl text-secondary" />}
                                    title={item.name}
                                    description={item.dosage}
                                />
                                <Tag color="success">Active</Tag>
                            </List.Item>
                        )}
                    />
                </Card>
            ),
        },
    ];

    return (
        <div className="h-full flex flex-col">
            <div className="mb-4 flex items-center gap-4">
                <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/patients')} />
                <div>
                    <h1 className="text-2xl font-bold m-0">Sarah Johnson</h1>
                    <span className="text-gray-500">PT-1001 • DOB: 04/12/1985 (40y)</span>
                </div>
            </div>

            <div className="flex-1 bg-white rounded-lg p-4 shadow-sm">
                <Tabs defaultActiveKey="1" items={items} />
            </div>
        </div>
    );
};

export default PatientChartScreen;
