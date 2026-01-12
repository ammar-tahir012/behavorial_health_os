import React, { useState } from 'react';
import { Button, Modal, Input, Rate, message } from 'antd';
import { SmileOutlined, FrownOutlined } from '@ant-design/icons';
import { supabase } from '../supabaseClient';

const FeedbackWidget = ({ pageContext = 'unknown' }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [sentiment, setSentiment] = useState(null);
    const [loading, setLoading] = useState(false);
    const [comment, setComment] = useState('');

    const showModal = (type) => {
        setSentiment(type);
        setIsModalVisible(true);
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            if (supabase) {
                await supabase.from('user_feedback').insert([{
                    sentiment,
                    message: comment,
                    page_url: window.location.pathname,
                    created_at: new Date()
                }]);
            }
            message.success('Thanks for your feedback!');
            setIsModalVisible(false);
            setComment('');
        } catch (error) {
            console.error('Feedback error:', error);
            message.error('Failed to submit feedback');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="py-6 border-t border-gray-100 mt-8 text-center bg-gray-50 rounded-xl">
            <p className="text-gray-500 mb-4 text-sm">Was this page helpful?</p>
            <div className="flex justify-center gap-4">
                <Button
                    shape="circle"
                    icon={<SmileOutlined />}
                    size="large"
                    onClick={() => showModal('positive')}
                    className="hover:text-green-500 hover:border-green-500"
                />
                <Button
                    shape="circle"
                    icon={<FrownOutlined />}
                    size="large"
                    onClick={() => showModal('negative')}
                    className="hover:text-red-500 hover:border-red-500"
                />
            </div>

            <Modal
                title="Tell us more"
                open={isModalVisible}
                onOk={handleSubmit}
                onCancel={() => setIsModalVisible(false)}
                confirmLoading={loading}
                okText="Submit"
            >
                <div className="py-4">
                    <p className="mb-2 text-gray-600">
                        {sentiment === 'positive'
                            ? "Glad to hear it! What did you like most?"
                            : "Sorry to hear that. How can we improve?"}
                    </p>
                    <Input.TextArea
                        rows={4}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Your thoughts..."
                    />
                </div>
            </Modal>
        </div>
    );
};

export default FeedbackWidget;
