import { Layout } from 'antd';
import { CodeOutlined } from '@ant-design/icons';

const { Header: AntHeader } = Layout;

interface HeaderProps {
  title?: string;
}

const Header = ({ title = "Darren's Portfolio" }: HeaderProps) => {
  return (
    <AntHeader style={{ 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 50px'
    }}>
      <div style={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}>
        <CodeOutlined /> {title}
      </div>
    </AntHeader>
  );
};

export default Header; 