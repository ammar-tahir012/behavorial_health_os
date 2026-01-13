import React, { useState } from 'react';
import { Button, QRCode, Card, Input, message, Form } from 'antd';
import { supabase } from '../supabaseClient';

const MFAEnrollment = ({ onComplete }) => {
    const [factorId, setFactorId] = useState(null);
    const [qrCode, setQrCode] = useState(null);
    const [loading, setLoading] = useState(false);

    // 1. Start Challenge / Get QR Code
    const startEnrollment = async () => {
        setLoading(true);
        const { data, error } = await supabase.auth.mfa.enroll({
            factorType: 'totp'
        });

        if (error) {
            message.error(error.message);
            setLoading(false);
            return;
        }

        setFactorId(data.id);
        setQrCode(data.totp.uri); // Use URI for the QRCode component, not the image blob
        setLoading(false);
    };

    // 2. Verify Code
    const onVerify = async (values) => {
        setLoading(true);
        const challenge = await supabase.auth.mfa.challenge({ factorId });

        if (challenge.error) {
            message.error(challenge.error.message);
            setLoading(false);
            return;
        }

        const verify = await supabase.auth.mfa.verify({
            factorId,
            challengeId: challenge.data.id,
            code: values.code
        });

        if (verify.error) {
            message.error(verify.error.message);
        } else {
            message.success("MFA Enabled Successfully!");
            if (onComplete) onComplete();
        }
        setLoading(false);
    };

    return (
        <Card title="Secure Your Account (MFA)" className="w-full max-w-md mx-auto shadow-sm">
            {!qrCode ? (
                <div className="text-center">
                    <p className="mb-4 text-gray-600">
                        Add an extra layer of security. Required for HIPAA compliance.
                    </p>
                    <Button type="primary" onClick={startEnrollment} loading={loading}>
                        Enroll in MFA
                    </Button>
                </div>
            ) : (
                <div className="text-center">
                    <p className="mb-4">Scan this QR code with your authenticator app (Google Auth, Authy, etc.):</p>
                    <div className="flex justify-center mb-6">
                        <QRCode value={qrCode} />
                    </div>

                    <Form onFinish={onVerify} layout="vertical">
                        <Form.Item
                            name="code"
                            label="Enter 6-digit Code"
                            rules={[
                                { required: true, message: 'Please enter code' },
                                { len: 6, message: 'Must be 6 digits' }
                            ]}
                        >
                            <Input placeholder="123456" className="text-center text-lg tracking-widest" maxLength={6} />
                        </Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} block>
                            Verify & Activate
                        </Button>
                    </Form>
                </div>
            )}
        </Card>
    );
};

export default MFAEnrollment;
