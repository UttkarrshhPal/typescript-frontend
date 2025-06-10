import React, { useState } from 'react';
import { Layout, Typography, message } from 'antd';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import type { Task, TaskFormData } from './types/task';
import './App.css';

const { Header, Content } = Layout;
const { Title } = Typography;

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();

  const handleAddTask = () => {
    setEditingTask(undefined);
    setIsFormVisible(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsFormVisible(true);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    message.success('Task deleted successfully');
  };

  const handleFormSubmit = (values: TaskFormData) => {
    const now = new Date().toISOString();

    if (editingTask) {
      // Update existing task
      setTasks(tasks.map(task =>
        task.id === editingTask.id
          ? { ...task, ...values, updatedAt: now }
          : task
      ));
      message.success('Task updated successfully');
    } else {
      // Create new task
      const newTask: Task = {
        id: Date.now().toString(),
        ...values,
        createdAt: now,
        updatedAt: now,
      };
      setTasks([...tasks, newTask]);
      message.success('Task created successfully');
    }

    setIsFormVisible(false);
  };

  return (
    <Layout className="layout">
      <Header style={{ background: '#fff', padding: '0 24px' }}>
        <Title level={2} style={{ margin: '16px 0' }}>Task Management</Title>
      </Header>
      <Content>
        <TaskList
          tasks={tasks}
          onAdd={handleAddTask}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
        />
        <TaskForm
          visible={isFormVisible}
          task={editingTask}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsFormVisible(false)}
        />
      </Content>
    </Layout>
  );
}

export default App;
