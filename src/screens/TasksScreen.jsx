import React, { useState } from 'react';
import { List, Checkbox, Card, Button, Input, Tag, DatePicker, Select } from 'antd';
import { PlusOutlined, CalendarOutlined } from '@ant-design/icons';

const TasksScreen = () => {
    const [tasks, setTasks] = useState([
        { id: 1, title: 'Complete intake note for Michael Chen', due: 'Today', tag: 'Documentation', done: false },
        { id: 2, title: 'Call Sarah regarding medication refill', due: 'Tomorrow', tag: 'Clinical', done: false },
        { id: 3, title: 'Submit billing for week of Oct 20', due: 'Fri', tag: 'Admin', done: true },
        { id: 4, title: 'Team case review meeting', due: 'Thu', tag: 'Meeting', done: false },
    ]);

    const toggleTask = (id) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
    };

    return (
        <div className="h-full">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-text">My Tasks</h1>
                <Button type="primary" icon={<PlusOutlined />}>Add Task</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="shadow-sm md:col-span-2">
                    <List
                        dataSource={tasks}
                        renderItem={item => (
                            <List.Item
                                actions={[<span className={`text-sm ${item.done ? 'text-gray-400' : 'text-red-500'}`}>{item.due}</span>]}
                            >
                                <List.Item.Meta
                                    avatar={<Checkbox checked={item.done} onChange={() => toggleTask(item.id)} />}
                                    title={
                                        <span className={item.done ? 'line-through text-gray-400' : ''}>
                                            {item.title}
                                        </span>
                                    }
                                    description={<Tag>{item.tag}</Tag>}
                                />
                            </List.Item>
                        )}
                    />
                </Card>

                <Card title="Add Quick Task" className="shadow-sm h-fit">
                    <div className="flex flex-col gap-3">
                        <Input placeholder="Task title..." />
                        <DatePicker className="w-full" placeholder="Due date" />
                        <Select placeholder="Category" className="w-full">
                            <Select.Option value="doc">Documentation</Select.Option>
                            <Select.Option value="clinical">Clinical</Select.Option>
                            <Select.Option value="admin">Admin</Select.Option>
                        </Select>
                        <Button type="primary" block>Add</Button>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default TasksScreen;
