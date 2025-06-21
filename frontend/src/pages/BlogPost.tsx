import { useParams, useNavigate } from 'react-router-dom';
import { Layout, Typography, Card, Row, Col, Tag, Space, Button, Spin, Breadcrumb, Divider } from 'antd';
import { 
  ArrowLeftOutlined, 
  ClockCircleOutlined, 
  TagOutlined, 
  CalendarOutlined,
  BookOutlined
} from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useBlogPost, useBlogPostBySlug } from '@/hooks/useBlog';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

const BlogPost = () => {
  const { id, slug } = useParams<{ id?: string; slug?: string }>();
  const navigate = useNavigate();
  
  // 根據路由參數決定使用哪個 hook
  const isSlugRoute = window.location.pathname.includes('/blog/post/');
  const identifier = isSlugRoute ? slug : id;
  
  const { data: post, loading, error } = isSlugRoute 
    ? useBlogPostBySlug(identifier || '')
    : useBlogPost(identifier || '');

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
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
                <CalendarOutlined /> {formatDate(post.publishedAt || post.createdAt)}
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
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => <Title level={1} style={{ marginTop: '32px', marginBottom: '16px' }}>{children}</Title>,
                h2: ({ children }) => <Title level={2} style={{ marginTop: '28px', marginBottom: '14px' }}>{children}</Title>,
                h3: ({ children }) => <Title level={3} style={{ marginTop: '24px', marginBottom: '12px' }}>{children}</Title>,
                h4: ({ children }) => <Title level={4} style={{ marginTop: '20px', marginBottom: '10px' }}>{children}</Title>,
                p: ({ children }) => <Paragraph style={{ marginBottom: '16px' }}>{children}</Paragraph>,
                ul: ({ children }) => <ul style={{ marginBottom: '16px', paddingLeft: '24px' }}>{children}</ul>,
                ol: ({ children }) => <ol style={{ marginBottom: '16px', paddingLeft: '24px' }}>{children}</ol>,
                li: ({ children }) => <li style={{ marginBottom: '8px' }}>{children}</li>,
                blockquote: ({ children }) => (
                  <blockquote style={{
                    borderLeft: '4px solid #1890ff',
                    paddingLeft: '16px',
                    margin: '16px 0',
                    fontStyle: 'italic',
                    color: '#666'
                  }}>
                    {children}
                  </blockquote>
                ),
                code: ({ children, className }) => {
                  const isInline = !className;
                  return isInline ? (
                    <code style={{
                      background: '#f5f5f5',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontSize: '14px',
                      fontFamily: 'monospace'
                    }}>
                      {children}
                    </code>
                  ) : (
                    <pre style={{
                      background: '#f5f5f5',
                      padding: '16px',
                      borderRadius: '8px',
                      overflow: 'auto',
                      margin: '16px 0',
                      fontSize: '14px',
                      lineHeight: '1.5'
                    }}>
                      <code>{children}</code>
                    </pre>
                  );
                },
                table: ({ children }) => (
                  <div style={{ overflow: 'auto', margin: '16px 0' }}>
                    <table style={{
                      width: '100%',
                      borderCollapse: 'collapse',
                      border: '1px solid #d9d9d9'
                    }}>
                      {children}
                    </table>
                  </div>
                ),
                th: ({ children }) => (
                  <th style={{
                    border: '1px solid #d9d9d9',
                    padding: '8px 12px',
                    background: '#fafafa',
                    fontWeight: 'bold',
                    textAlign: 'left'
                  }}>
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td style={{
                    border: '1px solid #d9d9d9',
                    padding: '8px 12px'
                  }}>
                    {children}
                  </td>
                ),
                a: ({ children, href }) => (
                  <a href={href} style={{ color: '#1890ff', textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">
                    {children}
                  </a>
                ),
                img: ({ src, alt }) => (
                  <img 
                    src={src} 
                    alt={alt} 
                    style={{
                      maxWidth: '100%',
                      height: 'auto',
                      borderRadius: '8px',
                      margin: '16px 0'
                    }}
                  />
                )
              }}
            >
              {post.content}
            </ReactMarkdown>
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