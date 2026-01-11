import React, { useState } from 'react';
import { Button, Card, Avatar, Tooltip } from 'antd';
import {
    AudioOutlined,
    AudioMutedOutlined,
    VideoCameraOutlined,
    VideoCameraAddOutlined,
    PhoneOutlined,
    MessageOutlined,
    MoreOutlined
} from '@ant-design/icons';

const TelehealthScreen = () => {
    const [muted, setMuted] = useState(false);
    const [videoOff, setVideoOff] = useState(false);

    return (
        <div className="h-full flex flex-col items-center justify-center bg-gray-900 rounded-lg overflow-hidden relative" style={{ minHeight: '80vh' }}>
            {/* Main Video Feed (Patient) */}
            <div className={`w-full h-full flex items-center justify-center ${videoOff ? 'bg-gray-800' : ''}`}>
                {videoOff ? (
                    <Avatar size={128} className="bg-primary">SJ</Avatar>
                ) : (
                    <div className="text-white text-center">
                        <p className="text-6xl mb-4">👩🏼</p>
                        <p className="text-xl">Sarah Johnson (Patient)</p>
                        <p className="text-sm text-gray-400">00:15:23</p>
                    </div>
                )}
            </div>

            {/* Self View (Clinician) */}
            <div className="absolute top-4 right-4 w-48 h-36 bg-gray-800 rounded-lg shadow-lg border-2 border-gray-700 flex items-center justify-center overflow-hidden">
                <p className="text-2xl">👨🏻‍⚕️</p>
            </div>

            {/* Controls Bar */}
            <div className="absolute bottom-8 flex gap-4 bg-gray-800/80 px-8 py-4 rounded-full backdrop-blur-sm">
                <Tooltip title={muted ? "Unmute" : "Mute"}>
                    <Button
                        shape="circle"
                        size="large"
                        type={muted ? 'primary' : 'default'}
                        danger={muted}
                        icon={muted ? <AudioMutedOutlined /> : <AudioOutlined />}
                        onClick={() => setMuted(!muted)}
                    />
                </Tooltip>

                <Tooltip title={videoOff ? "Start Video" : "Stop Video"}>
                    <Button
                        shape="circle"
                        size="large"
                        type={videoOff ? 'primary' : 'default'}
                        danger={videoOff}
                        icon={videoOff ? <VideoCameraAddOutlined /> : <VideoCameraOutlined />}
                        onClick={() => setVideoOff(!videoOff)}
                    />
                </Tooltip>

                <Tooltip title="Chat">
                    <Button shape="circle" size="large" icon={<MessageOutlined />} />
                </Tooltip>

                <Tooltip title="End Call">
                    <Button type="primary" danger shape="circle" size="large" icon={<PhoneOutlined />} className="ml-4" />
                </Tooltip>
            </div>
        </div>
    );
};

export default TelehealthScreen;
