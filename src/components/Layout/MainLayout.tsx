import React from 'react';
import { Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  PlayCircleOutlined,
  HistoryOutlined,
  SettingOutlined
} from '@ant-design/icons';
import styled from 'styled-components';
import { theme } from '../../theme/theme';

const { Header, Sider, Content } = Layout;

const StyledLayout = styled(Layout)`
  min-height: 100vh;
`;

const StyledHeader = styled(Header)`
  background: ${theme.colors.white};
  padding: 0 ${theme.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: ${theme.shadows.small};
`;

const StyledSider = styled(Sider)`
  background: ${theme.colors.white};
  box-shadow: ${theme.shadows.small};
`;

const StyledContent = styled(Content)`
  margin: ${theme.spacing.lg};
  padding: ${theme.spacing.lg};
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.medium};
  box-shadow: ${theme.shadows.small};
`;

const Logo = styled.div`
  height: 32px;
  margin: ${theme.spacing.md} 0;
  color: ${theme.colors.primary};
  font-size: ${theme.typography.h3.fontSize};
  font-weight: ${theme.typography.h3.fontWeight};
  text-align: center;
`;

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <StyledLayout>
      <StyledHeader>
        <div style={{ color: theme.colors.primary, fontSize: theme.typography.h2.fontSize }}>
          Task Management
        </div>
      </StyledHeader>
      <Layout>
        <StyledSider width={200}>
          <Logo>TM</Logo>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            style={{ borderRight: 0 }}
          >
            <Menu.Item key="1" icon={<DashboardOutlined />}>
              Dashboard
            </Menu.Item>
            <Menu.Item key="2" icon={<PlayCircleOutlined />}>
              Tasks
            </Menu.Item>
            <Menu.Item key="3" icon={<HistoryOutlined />}>
              History
            </Menu.Item>
            <Menu.Item key="4" icon={<SettingOutlined />}>
              Settings
            </Menu.Item>
          </Menu>
        </StyledSider>
        <Layout>
          <StyledContent>
            {children}
          </StyledContent>
        </Layout>
      </Layout>
    </StyledLayout>
  );
};

export default MainLayout; 