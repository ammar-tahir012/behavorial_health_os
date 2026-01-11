import React from 'react';
import { Form, Input, Button, Card, Select, DatePicker, Checkbox, Row, Col, Space, message } from 'antd';

import { SaveOutlined, CloseOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { TextArea } = Input;
const { Option } = Select;

const NoteEditorScreen = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Success:', values);
        message.success('Note saved successfully');
        navigate('/patients/1'); // Mock navigation back to patient
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            className="h-full flex flex-col"
        >
            <div className="flex justify-between items-center mb-4 sticky top-0 bg-background z-10 py-2">
                <div>
                    <h1 className="text-2xl font-bold">New Clinical Note</h1>
                    <p className="text-gray-500 m-0">Sarah Johnson • 10/12/2026</p>
                </div>
                <Space>
                    <Button onClick={() => navigate(-1)}>Cancel</Button>
                    <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>Sign & Save</Button>
                </Space>
            </div>

            <Row gutter={24}>
                <Col span={16}>
                    <Card title="SOAP Note" className="shadow-sm mb-4">
                        <Form.Item label="Subjective" name="subjective" rules={[{ required: true }]}>
                            <TextArea rows={4} placeholder="Patient's chief complaint, history of present illness..." />
                        </Form.Item>
                        <Form.Item label="Objective" name="objective" rules={[{ required: true }]}>
                            <TextArea rows={4} placeholder="Mental status exam, physical observations..." />
                        </Form.Item>
                        <Form.Item label="Assessment" name="assessment" rules={[{ required: true }]}>
                            <TextArea rows={4} placeholder="Clinical impression, diagnosis..." />
                        </Form.Item>
                        <Form.Item label="Plan" name="plan" rules={[{ required: true }]}>
                            <TextArea rows={4} placeholder="Treatment plan, medications, follow-up..." />
                        </Form.Item>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="Session Details" className="shadow-sm mb-4">
                        <Form.Item label="Date of Service" name="date">
                            <DatePicker className="w-full" />
                        </Form.Item>
                        <Form.Item label="Session Type" name="type">
                            <Select>
                                <Option value="90837">90837 - Psychotherapy 60m</Option>
                                <Option value="90834">90834 - Psychotherapy 45m</Option>
                                <Option value="90791">90791 - Diagnostic Eval</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Location" name="location">
                            <Select defaultValue="office">
                                <Option value="office">Office</Option>
                                <Option value="telehealth">Telehealth</Option>
                            </Select>
                        </Form.Item>
                    </Card>
                    <Card title="Mental Status Exam" className="shadow-sm">
                        <Form.Item name="mood" label="Mood">
                            <Select mode="multiple" placeholder="Select mood">
                                <Option value="euthymic">Euthymic</Option>
                                <Option value="depressed">Depressed</Option>
                                <Option value="anxious">Anxious</Option>
                                <Option value="irritable">Irritable</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="risk" label="Risk Assessment">
                            <Checkbox.Group>
                                <div className="flex flex-col gap-2">
                                    <Checkbox value="si">Suicidal Ideation</Checkbox>
                                    <Checkbox value="hi">Homicidal Ideation</Checkbox>
                                    <Checkbox value="sh">Self Harm</Checkbox>
                                </div>
                            </Checkbox.Group>
                        </Form.Item>
                    </Card>
                </Col>
            </Row>
        </Form>
    );
};

export default NoteEditorScreen;
