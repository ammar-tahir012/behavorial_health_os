import React from 'react'
import ReactDOM from 'react-dom/client'
import { ConfigProvider, theme } from 'antd'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#2b66cb',
          colorBgContainer: '#111827',
          colorBgLayout: '#050505',
          colorText: '#F8FAFC',
          colorBorder: '#374151',
          colorSuccess: '#10B981',
          colorWarning: '#F59E0B',
          colorError: '#EF4444',
          fontFamily: 'Inter',
        },
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>,
)
