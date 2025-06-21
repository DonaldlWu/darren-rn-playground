import { Layout, Space, Divider, Typography } from 'antd';
import { 
  GithubOutlined, 
  LinkedinOutlined, 
  MailOutlined 
} from '@ant-design/icons';

const { Footer: AntFooter } = Layout;
const { Text } = Typography;

const Footer = () => {
  return (
    <AntFooter style={{ 
      textAlign: 'center', 
      background: '#001529',
      color: 'white'
    }}>
      <Space size="large">
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>
          <GithubOutlined style={{ fontSize: '24px' }} />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>
          <LinkedinOutlined style={{ fontSize: '24px' }} />
        </a>
        <a href="mailto:darren@example.com" style={{ color: 'white' }}>
          <MailOutlined style={{ fontSize: '24px' }} />
        </a>
      </Space>
      <Divider style={{ borderColor: '#333', margin: '16px 0' }} />
      <Text style={{ color: '#999' }}>
        © 2024 Darren's Portfolio. Built with React + TypeScript + Ant Design
      </Text>
    </AntFooter>
  );
};

export default Footer; 