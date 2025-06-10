import React from 'react';
import { Form, Input, Button, Modal } from 'antd';
import styled from 'styled-components';
import { Task } from '../../types/task';
import { theme } from '../../theme/theme';

const StyledForm = styled(Form)`
  .ant-form-item-label {
    font-weight: 500;
  }

  .ant-input {
    border-radius: ${theme.borderRadius.small};
  }

  .ant-btn {
    border-radius: ${theme.borderRadius.small};
  }
`;

interface TaskFormProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: Partial<Task>) => void;
  initialValues?: Partial<Task>;
}

const TaskForm: React.FC<TaskFormProps> = ({
  visible,
  onCancel,
  onSubmit,
  initialValues,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values);
      form.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  return (
    <Modal
      title={initialValues ? 'Edit Task' : 'Create Task'}
      open={visible}
      onCancel={onCancel}
      onOk={handleSubmit}
      okText={initialValues ? 'Update' : 'Create'}
      cancelText="Cancel"
    >
      <StyledForm
        form={form}
        layout="vertical"
        initialValues={initialValues}
      >
        <Form.Item
          name="name"
          label="Task Name"
          rules={[{ required: true, message: 'Please enter task name' }]}
        >
          <Input placeholder="Enter task name" />
        </Form.Item>

        <Form.Item
          name="owner"
          label="Owner"
          rules={[{ required: true, message: 'Please enter owner name' }]}
        >
          <Input placeholder="Enter owner name" />
        </Form.Item>

        <Form.Item
          name="command"
          label="Command"
          rules={[{ required: true, message: 'Please enter command' }]}
        >
          <Input.TextArea
            placeholder="Enter shell command"
            rows={4}
          />
        </Form.Item>
      </StyledForm>
    </Modal>
  );
};

export default TaskForm; 