import React from 'react';
import { ConfigProvider } from 'antd';
import MainLayout from './components/Layout/MainLayout';
import TaskList from './components/TaskList/TaskList';
import { theme } from './theme/theme';
import './App.css';

const App: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: theme.colors.primary,
          borderRadius: 6,
          fontFamily: "'Inter', sans-serif",
        },
      }}
    >
      <MainLayout>
        <TaskList />
      </MainLayout>
    </ConfigProvider>
  );
};

export default App; 