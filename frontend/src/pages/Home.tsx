import { Layout, Typography, Card, Row, Col, Button, Space, Avatar } from 'antd';
import { 
  UserOutlined,
  RocketOutlined,
  MailOutlined,
  HeartOutlined
} from '@ant-design/icons';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useUser } from '@/hooks';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

const Home = () => {
  const { userInfo, loading, error } = useUser();

  // 如果發生錯誤，顯示錯誤訊息
  if (error) {
    return (
      <Layout className="layout" style={{ minHeight: '100vh' }}>
        <Header />
        <Content style={{ padding: '50px', textAlign: 'center' }}>
          <Title level={2} type="danger">
            載入失敗
          </Title>
          <Paragraph>
            抱歉，無法載入個人資訊。請稍後再試。
          </Paragraph>
        </Content>
        <Footer />
      </Layout>
    );
  }

  return (
    <Layout className="layout" style={{ minHeight: '100vh' }}>
      <Header />

      <Content style={{ padding: '0 50px' }}>
        {/* Hero Section */}
        <div style={{ 
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          padding: '80px 0',
          textAlign: 'center',
          marginBottom: '50px'
        }}>
          <Avatar 
            size={120} 
            icon={<UserOutlined />} 
            style={{ marginBottom: '20px', backgroundColor: '#667eea' }}
          />
          <Title level={1} style={{ marginBottom: '10px' }}>
            {loading ? 'Loading...' : userInfo?.name}
          </Title>
          <Title level={3} type="secondary" style={{ marginBottom: '20px' }}>
            {userInfo?.title}
          </Title>
          <Paragraph style={{ fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
            {userInfo?.description}
          </Paragraph>
          <Space size="large" style={{ marginTop: '30px' }}>
            <Button type="primary" size="large" icon={<RocketOutlined />}>
              View Projects
            </Button>
            <Button size="large" icon={<MailOutlined />}>
              Contact Me
            </Button>
          </Space>
        </div>

        {/* Skills Section */}
        <Row gutter={[24, 24]} style={{ marginBottom: '50px' }}>
          <Col xs={24} md={12}>
            <Card title="技術技能" bordered={false} style={{ height: '100%' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {userInfo?.skills.map((skill, index) => (
                  <Button key={index} type="default" size="small">
                    {skill}
                  </Button>
                ))}
              </div>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card title="工作經驗" bordered={false} style={{ height: '100%' }}>
              <Title level={2} style={{ color: '#667eea', margin: 0 }}>
                {userInfo?.experience}
              </Title>
              <Text type="secondary">年全端開發經驗</Text>
            </Card>
          </Col>
        </Row>

        {/* About Section */}
        <Card title="關於我" bordered={false} style={{ marginBottom: '50px' }}>
          <Row gutter={24}>
            <Col xs={24} md={12}>
              <Paragraph>
                我是一名充滿熱情的全端開發者，專注於創建高品質的Web應用程式。
                從Rails到React，我一直在學習和適應最新的技術趨勢。
              </Paragraph>
              <Paragraph>
                目前正在探索現代化的前端開發技術，包括TypeScript、React Hooks和
                各種實用的開發工具，如ahooks等。
              </Paragraph>
            </Col>
            <Col xs={24} md={12}>
              <div style={{ textAlign: 'center' }}>
                <HeartOutlined style={{ fontSize: '48px', color: '#ff4d4f' }} />
                <Paragraph style={{ marginTop: '16px' }}>
                  熱愛程式開發，持續學習新技術
                </Paragraph>
              </div>
            </Col>
          </Row>
        </Card>
      </Content>

      <Footer />
    </Layout>
  );
};

export default Home; 