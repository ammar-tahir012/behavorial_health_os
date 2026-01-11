import React from 'react';
import { Table, Card, Tag, Statistic, Row, Col, Button, DatePicker } from 'antd';
import { DollarOutlined, FilePdfOutlined, FilterOutlined } from '@ant-design/icons';

const BillingScreen = () => {
    const columns = [
        { title: 'Invoice ID', dataIndex: 'id', key: 'id' },
        { title: 'Patient', dataIndex: 'patient', key: 'patient' },
        { title: 'Date', dataIndex: 'date', key: 'date' },
        { title: 'Service', dataIndex: 'service', key: 'service' },
        { title: 'Amount', dataIndex: 'amount', key: 'amount', render: (val) => `$${val}` },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={status === 'Paid' ? 'success' : status === 'Pending' ? 'warning' : 'error'}>
                    {status}
                </Tag>
            )
        },
        { title: 'Action', key: 'action', render: () => <Button type="link" icon={<FilePdfOutlined />}>PDF</Button> }
    ];

    const data = [
        { key: '1', id: 'INV-2023-001', patient: 'Sarah Johnson', date: '2025-10-24', service: '90837 - Therapy', amount: 150, status: 'Pending' },
        { key: '2', id: 'INV-2023-002', patient: 'Michael Chen', date: '2025-10-23', service: '90834 - Therapy', amount: 120, status: 'Paid' },
        { key: '3', id: 'INV-2023-003', patient: 'Emily Davis', date: '2025-10-22', service: '90791 - Eval', amount: 200, status: 'Paid' },
        { key: '4', id: 'INV-2023-004', patient: 'James Wilson', date: '2025-10-21', service: 'Med Mgmt', amount: 100, status: 'Overdue' },
    ];

    return (
        <div className="h-full">
            <h1 className="text-2xl font-bold mb-6 text-text">Billing & Invoices</h1>

            <Row gutter={16} className="mb-6">
                <Col span={6}>
                    <Card>
                        <Statistic title="Total Revenue (Oct)" value={5420} prefix="$" valueStyle={{ color: '#10B981' }} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic title="Pending Payments" value={1350} prefix="$" valueStyle={{ color: '#F59E0B' }} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic title="Claims Submitted" value={45} />
                    </Card>
                </Col>
            </Row>

            <Card className="shadow-sm">
                <div className="flex justify-between mb-4">
                    <div className="flex gap-2">
                        <DatePicker.RangePicker />
                        <Button icon={<FilterOutlined />}>Filter</Button>
                    </div>
                    <Button type="primary" icon={<DollarOutlined />}>Create Invoice</Button>
                </div>
                <Table columns={columns} dataSource={data} />
            </Card>
        </div>
    );
};

export default BillingScreen;
