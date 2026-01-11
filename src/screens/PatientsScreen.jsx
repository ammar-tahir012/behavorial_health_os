import React, { useState } from 'react';
import { Table, Tag, Space, Button, Input, Card, Avatar } from 'antd';
import { SearchOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import moment from 'moment'; // Note: Antd uses dayjs usually, but we can standard JS Date for simplicity if moment is missing, but assume standard format

const PatientsScreen = () => {
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState('');

    const columns = [
        {
            title: 'Patient',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <div className="flex items-center gap-3">
                    <Avatar className="bg-primary">{text[0]}</Avatar>
                    <div>
                        <div className="font-medium text-text">{text}</div>
                        <div className="text-xs text-gray-500">ID: {record.id}</div>
                    </div>
                </div>
            ),
        },
        {
            title: 'Date of Birth',
            dataIndex: 'dob',
            key: 'dob',
            responsive: ['md'],
        },
        {
            title: 'Diagnosis',
            dataIndex: 'diagnosis',
            key: 'diagnosis',
            render: (tags) => (
                <>
                    {tags.map((tag) => (
                        <Tag color="blue" key={tag}>
                            {tag}
                        </Tag>
                    ))}
                </>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={status === 'Active' ? 'success' : 'default'}>
                    {status}
                </Tag>
            ),
        },
        {
            title: 'Last Visit',
            dataIndex: 'lastVisit',
            key: 'lastVisit',
            responsive: ['lg'],
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="link" onClick={() => navigate(`/patients/${record.key}`)}>View Chart</Button>
                </Space>
            ),
        },
    ];

    const data = [
        {
            key: '1',
            id: 'PT-1001',
            name: 'Sarah Johnson',
            dob: '1985-04-12',
            diagnosis: ['Anxiety', 'Depression'],
            status: 'Active',
            lastVisit: '2025-10-24',
        },
        {
            key: '2',
            id: 'PT-1002',
            name: 'Michael Chen',
            dob: '1990-08-23',
            diagnosis: ['ADHD'],
            status: 'Active',
            lastVisit: '2025-10-20',
        },
        {
            key: '3',
            id: 'PT-1003',
            name: 'Emily Davis',
            dob: '1978-11-05',
            diagnosis: ['PTSD'],
            status: 'Inactive',
            lastVisit: '2025-09-15',
        },
        {
            key: '4',
            id: 'PT-1004',
            name: 'James Wilson',
            dob: '1982-02-14',
            diagnosis: ['Bipolar I'],
            status: 'Active',
            lastVisit: 'Today',
        },
        {
            key: '5',
            id: 'PT-1005',
            name: 'Linda Martinez',
            dob: '1995-06-30',
            diagnosis: ['Anxiety'],
            status: 'Active',
            lastVisit: '2025-10-22',
        },
    ];

    return (
        <div className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-text">Patient Directory</h1>
                <Button type="primary" icon={<PlusOutlined />}>Add Patient</Button>
            </div>

            <Card className="shadow-sm flex-1">
                <div className="mb-4 flex gap-4">
                    <Input
                        prefix={<SearchOutlined />}
                        placeholder="Search by name, ID, or diagnosis"
                        className="max-w-md"
                        value={searchText}
                        onChange={e => setSearchText(e.target.value)}
                    />
                </div>
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={{ pageSize: 8 }}
                    className="overflow-hidden"
                />
            </Card>
        </div>
    );
};

export default PatientsScreen;
