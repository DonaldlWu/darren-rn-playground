import { Layout, Menu } from 'antd';
import { CodeOutlined, HomeOutlined, BookOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const { Header: AntHeader } = Layout;

interface HeaderProps {
  title?: string;
}

const Header = ({ title = "Darren's Portfolio" }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: '首頁',
      onClick: () => navigate('/')
    },
    {
      key: '/blog',
      icon: <BookOutlined />,
      label: '部落格',
      onClick: () => navigate('/blog')
    }
  ];

  return (
    <AntHeader style={{ 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 50px'
    }}>
      <div 
        style={{ 
          color: 'white', 
          fontSize: '24px', 
          fontWeight: 'bold',
          cursor: 'pointer',
          marginRight: '40px'
        }}
        onClick={() => navigate('/')}
      >
        <CodeOutlined /> {title}
      </div>
      
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[location.pathname]}
        items={menuItems}
        style={{ 
          background: 'transparent',
          border: 'none',
          flex: 1
        }}
      />
    </AntHeader>
  );
};

export default Header; 