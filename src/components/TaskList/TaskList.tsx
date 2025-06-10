import React, { useState } from 'react';
import { Table, Button, Input, Space, Modal, Typography } from 'antd';
import { SearchOutlined, PlayCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Task, mockTasks } from '../../types/task';
import { theme } from '../../theme/theme';

const { Title } = Typography;

const StyledContainer = styled.div`
  .ant-table-wrapper {
    background: ${theme.colors.white};
    border-radius: ${theme.borderRadius.medium};
    box-shadow: ${theme.shadows.small};
  }

  .ant-table-thead > tr > th {
    background: ${theme.colors.lightGray};
    color: ${theme.colors.darkGray};
  }

  .ant-table-tbody > tr:hover > td {
    background: ${theme.colors.lightGray};
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.lg};
`;

const SearchContainer = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
`;

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: Task, b: Task) => a.name.localeCompare(b.name),
    },
    {
      title: 'Owner',
      dataIndex: 'owner',
      key: 'owner',
    },
    {
      title: 'Command',
      dataIndex: 'command',
      key: 'command',
      ellipsis: true,
    },
    {
      title: 'Last Execution',
      dataIndex: 'taskExecutions',
      key: 'lastExecution',
      render: (taskExecutions: Task['taskExecutions']) =>
        taskExecutions.length > 0
          ? new Date(taskExecutions[taskExecutions.length - 1].startTime).toLocaleString()
          : 'Never',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Task) => (
        <Space>
          <Button
            type="primary"
            icon={<PlayCircleOutlined />}
            onClick={() => handleExecute(record)}
          >
            Execute
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const handleExecute = (task: Task) => {
    setSelectedTask(task);
    setIsModalVisible(true);
  };

  const handleDelete = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task =>
    task.name.toLowerCase().includes(searchText.toLowerCase()) ||
    task.owner.toLowerCase().includes(searchText.toLowerCase()) ||
    task.command.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <StyledContainer>
      <HeaderContainer>
        <Title level={2}>Tasks</Title>
        <SearchContainer>
          <Input
            placeholder="Search tasks..."
            prefix={<SearchOutlined />}
            onChange={e => handleSearch(e.target.value)}
            style={{ width: 300 }}
          />
          <Button type="primary">Create Task</Button>
        </SearchContainer>
      </HeaderContainer>

      <Table
        columns={columns}
        dataSource={filteredTasks}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} items`,
        }}
      />

      <Modal
        title="Task Execution"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={800}
      >
        {selectedTask && (
          <div>
            <Typography.Title level={4}>{selectedTask.name}</Typography.Title>
            <Typography.Paragraph>
              <strong>Command:</strong> {selectedTask.command}
            </Typography.Paragraph>
            <Typography.Paragraph>
              <strong>Owner:</strong> {selectedTask.owner}
            </Typography.Paragraph>
            <Typography.Title level={5}>Execution History</Typography.Title>
            {selectedTask.taskExecutions.map((execution, index) => (
              <div key={index} style={{ marginBottom: theme.spacing.md }}>
                <Typography.Text type="secondary">
                  {new Date(execution.startTime).toLocaleString()}
                </Typography.Text>
                <pre style={{
                  background: theme.colors.lightGray,
                  padding: theme.spacing.md,
                  borderRadius: theme.borderRadius.small,
                  marginTop: theme.spacing.xs
                }}>
                  {execution.output}
                </pre>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </StyledContainer>
  );
};

export default TaskList; 