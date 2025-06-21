import { Layout, Typography, Card, Row, Col, Button, Space, Avatar, Tag } from 'antd';
import { 
  UserOutlined,
  RocketOutlined,
  MailOutlined,
  HeartOutlined,
  BookOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useUser } from '@/hooks';
import { useFeaturedBlogPosts } from '@/hooks/useBlog';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

const Home = () => {
  const navigate = useNavigate();
  const { userInfo, loading, error } = useUser();
  const { data: featuredPosts } = useFeaturedBlogPosts();

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

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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
            <Button size="large" icon={<BookOutlined />} onClick={() => navigate('/blog')}>
              閱讀部落格
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
                {userInfo?.skills?.map((skill: string, index: number) => (
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

        {/* Featured Blog Posts Section */}
        {featuredPosts && featuredPosts.length > 0 && (
          <Card title="精選文章" bordered={false} style={{ marginBottom: '50px' }}>
            <Row gutter={[24, 24]}>
              {featuredPosts.slice(0, 3).map(post => (
                <Col xs={24} md={8} key={post.id}>
                  <Card
                    hoverable
                    style={{ height: '100%' }}
                    cover={
                      <div style={{ 
                        height: '150px', 
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <BookOutlined style={{ fontSize: '32px', color: 'white' }} />
                      </div>
                    }
                    actions={[
                      <Button type="link" key="read" onClick={() => navigate(`/blog/${post.id}`)}>
                        閱讀全文
                      </Button>
                    ]}
                  >
                    <Card.Meta
                      title={
                        <Title level={5} style={{ marginBottom: '8px' }}>
                          {post.title}
                        </Title>
                      }
                      description={
                        <div>
                          <Paragraph 
                            ellipsis={{ rows: 2 }} 
                            style={{ marginBottom: '12px', color: '#666' }}
                          >
                            {post.excerpt}
                          </Paragraph>
                          
                          <Space wrap style={{ marginBottom: '8px' }}>
                            {post.tags.slice(0, 2).map(tag => (
                              <Tag key={tag} color="blue">
                                {tag}
                              </Tag>
                            ))}
                          </Space>
                          
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text type="secondary" style={{ fontSize: '12px' }}>
                              <ClockCircleOutlined /> {post.readTime} 分鐘
                            </Text>
                            <Text type="secondary" style={{ fontSize: '12px' }}>
                              {formatDate(post.publishedAt)}
                            </Text>
                          </div>
                        </div>
                      }
                    />
                  </Card>
                </Col>
              ))}
            </Row>
            <div style={{ textAlign: 'center', marginTop: '24px' }}>
              <Button type="primary" size="large" onClick={() => navigate('/blog')}>
                查看更多文章
              </Button>
            </div>
          </Card>
        )}

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