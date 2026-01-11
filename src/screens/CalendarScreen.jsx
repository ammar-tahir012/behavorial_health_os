import React from 'react';
import { Calendar, Badge, Card, Button, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const CalendarScreen = () => {
    const getListData = (value) => {
        let listData;
        switch (value.date()) {
            case 8:
                listData = [
                    { type: 'warning', content: '9:00 AM - Sarah J.' },
                    { type: 'success', content: '10:30 AM - Mike C.' },
                ];
                break;
            case 10:
                listData = [
                    { type: 'warning', content: '2:00 PM - New Eval' },
                ];
                break;
            case 15:
                listData = [
                    { type: 'error', content: 'Urgent Slot' },
                ]
                break;
            default:
        }
        return listData || [];
    };

    const dateCellRender = (value) => {
        const listData = getListData(value);
        return (
            <ul className="list-none p-0 m-0">
                {listData.map((item) => (
                    <li key={item.content}>
                        <Badge status={item.type} text={<span className="text-xs">{item.content}</span>} />
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-text">Schedule</h1>
                <Button type="primary" icon={<PlusOutlined />}>New Appointment</Button>
            </div>

            <Card className="shadow-sm flex-1 overflow-auto">
                <Calendar
                    dateCellRender={dateCellRender}
                    className="p-4"
                />
            </Card>
        </div>
    );
};

export default CalendarScreen;
