import { useParams, useNavigate } from 'react-router-dom';
import { Layout, Typography, Card, Row, Col, Tag, Space, Button, Spin, Breadcrumb, Divider } from 'antd';
import { 
  ArrowLeftOutlined, 
  ClockCircleOutlined, 
  TagOutlined, 
  CalendarOutlined,
  BookOutlined
} from '@ant-design/icons';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useBlogPost } from '@/hooks/useBlog';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: post, loading, error } = useBlogPost(id || '');

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderMarkdownContent = (content: string) => {
    // 簡單的 Markdown 渲染（實際專案中可以使用 react-markdown 等庫）
    return content.split('\n').map((line, index) => {
      if (line.startsWith('# ')) {
        return <Title key={index} level={1}>{line.substring(2)}</Title>;
      }
      if (line.startsWith('## ')) {
        return <Title key={index} level={2}>{line.substring(3)}</Title>;
      }
      if (line.startsWith('### ')) {
        return <Title key={index} level={3}>{line.substring(4)}</Title>;
      }
      if (line.startsWith('- ')) {
        return <li key={index}>{line.substring(2)}</li>;
      }
      if (line.startsWith('```')) {
        return <pre key={index} style={{ 
          background: '#f5f5f5', 
          padding: '16px', 
          borderRadius: '4px',
          overflow: 'auto'
        }}>{line.substring(3)}</pre>;
      }
      if (line.trim() === '') {
        return <br key={index} />;
      }
      return <Paragraph key={index}>{line}</Paragraph>;
    });
  };

  if (loading) {
    return (
      <Layout className="layout" style={{ minHeight: '100vh' }}>
        <Header />
        <Content style={{ padding: '50px', textAlign: 'center' }}>
          <Spin size="large" />
          <Paragraph style={{ marginTop: '16px' }}>載入中...</Paragraph>
        </Content>
        <Footer />
      </Layout>
    );
  }

  if (error || !post) {
    return (
      <Layout className="layout" style={{ minHeight: '100vh' }}>
        <Header />
        <Content style={{ padding: '50px', textAlign: 'center' }}>
          <Title level={2} type="danger">
            文章不存在
          </Title>
          <Paragraph>
            抱歉，找不到這篇文章。可能已被刪除或移動。
          </Paragraph>
          <Button type="primary" onClick={() => navigate('/blog')}>
            返回部落格
          </Button>
        </Content>
        <Footer />
      </Layout>
    );
  }

  return (
    <Layout className="layout" style={{ minHeight: '100vh' }}>
      <Header />

      <Content style={{ padding: '0 50px' }}>
        {/* Breadcrumb */}
        <Breadcrumb style={{ margin: '24px 0' }}>
          <Breadcrumb.Item>
            <Button type="link" onClick={() => navigate('/')}>
              首頁
            </Button>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Button type="link" onClick={() => navigate('/blog')}>
              部落格
            </Button>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{post.title}</Breadcrumb.Item>
        </Breadcrumb>

        {/* Article Header */}
        <Card style={{ marginBottom: '40px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <Title level={1} style={{ marginBottom: '16px' }}>
              {post.title}
            </Title>
            
            <Space wrap style={{ marginBottom: '16px' }}>
              <Text type="secondary">
                <CalendarOutlined /> {formatDate(post.publishedAt)}
              </Text>
              <Text type="secondary">
                <ClockCircleOutlined /> {post.readTime} 分鐘閱讀
              </Text>
              {post.featured && (
                <Tag color="gold">
                  <BookOutlined /> 精選文章
                </Tag>
              )}
            </Space>

            <Space wrap>
              {post.tags.map(tag => (
                <Tag key={tag} color="blue">
                  <TagOutlined /> {tag}
                </Tag>
              ))}
            </Space>
          </div>

          <Divider />

          {/* Article Content */}
          <div style={{ 
            fontSize: '16px', 
            lineHeight: '1.8',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            {renderMarkdownContent(post.content)}
          </div>
        </Card>

        {/* Navigation */}
        <Row justify="center" style={{ marginBottom: '40px' }}>
          <Col>
            <Button 
              type="primary" 
              icon={<ArrowLeftOutlined />}
              size="large"
              onClick={() => navigate('/blog')}
            >
              返回部落格列表
            </Button>
          </Col>
        </Row>
      </Content>

      <Footer />
    </Layout>
  );
};

export default BlogPost; 