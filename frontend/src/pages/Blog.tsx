import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Typography, Card, Row, Col, Input, Select, Pagination, Tag, Space, Button, Spin, Empty } from 'antd';
import { SearchOutlined, BookOutlined, ClockCircleOutlined, TagOutlined } from '@ant-design/icons';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useBlogPosts, useBlogTags } from '@/hooks/useBlog';
import type { BlogQueryParams } from '@/types';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;
const { Search } = Input;
const { Option } = Select;

const Blog = () => {
  const navigate = useNavigate();
  const [queryParams, setQueryParams] = useState<BlogQueryParams>({
    page: 1,
    limit: 6
  });

  const { data: blogData, loading, error } = useBlogPosts(queryParams);
  const { data: tagsData } = useBlogTags();

  // 確保 tags 是陣列
  const tags = Array.isArray(tagsData) ? tagsData : [];

  const handleSearch = (value: string) => {
    setQueryParams(prev => ({
      ...prev,
      search: value,
      page: 1 // 重置到第一頁
    }));
  };

  const handleTagChange = (tag: string) => {
    setQueryParams(prev => ({
      ...prev,
      tag: tag === 'all' ? undefined : tag,
      page: 1 // 重置到第一頁
    }));
  };

  const handlePageChange = (page: number) => {
    setQueryParams(prev => ({
      ...prev,
      page
    }));
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (error) {
    return (
      <Layout className="layout" style={{ minHeight: '100vh' }}>
        <Header />
        <Content style={{ padding: '50px', textAlign: 'center' }}>
          <Title level={2} type="danger">
            載入失敗
          </Title>
          <Paragraph>
            抱歉，無法載入部落格文章。請稍後再試。
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
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '60px 0',
          textAlign: 'center',
          marginBottom: '40px',
          borderRadius: '8px'
        }}>
          <Title level={1} style={{ color: 'white', marginBottom: '16px' }}>
            <BookOutlined /> 技術部落格
          </Title>
          <Paragraph style={{ color: 'white', fontSize: '18px', marginBottom: '24px' }}>
            分享我的技術學習心得、開發經驗和最佳實踐
          </Paragraph>
        </div>

        {/* Search and Filter Section */}
        <Row gutter={[24, 24]} style={{ marginBottom: '40px' }}>
          <Col xs={24} md={16}>
            <Search
              placeholder="搜尋文章標題、內容或標籤..."
              allowClear
              enterButton={<SearchOutlined />}
              size="large"
              onSearch={handleSearch}
            />
          </Col>
          <Col xs={24} md={8}>
            <Select
              placeholder="選擇標籤"
              style={{ width: '100%' }}
              size="large"
              allowClear
              onChange={handleTagChange}
            >
              <Option value="all">所有標籤</Option>
              {tags.map(tag => (
                <Option key={tag} value={tag}>{tag}</Option>
              ))}
            </Select>
          </Col>
        </Row>

        {/* Blog Posts */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <Spin size="large" />
            <Paragraph style={{ marginTop: '16px' }}>載入中...</Paragraph>
          </div>
        ) : blogData?.posts && blogData.posts.length > 0 ? (
          <>
            <Row gutter={[24, 24]} style={{ marginBottom: '40px' }}>
              {blogData.posts.map(post => (
                <Col xs={24} md={12} lg={8} key={post.id}>
                  <Card
                    hoverable
                    style={{ height: '100%' }}
                    cover={
                      <div style={{ 
                        height: '200px', 
                        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <BookOutlined style={{ fontSize: '48px', color: '#667eea' }} />
                      </div>
                    }
                    actions={[
                      <Button 
                        type="link" 
                        key="read"
                        onClick={() => navigate(`/blog/post/${post.slug}`)}
                      >
                        閱讀全文
                      </Button>
                    ]}
                  >
                    <Card.Meta
                      title={
                        <Title level={4} style={{ marginBottom: '8px' }}>
                          {post.title}
                        </Title>
                      }
                      description={
                        <div>
                          <Paragraph 
                            ellipsis={{ rows: 3 }} 
                            style={{ marginBottom: '16px', color: '#666' }}
                          >
                            {post.excerpt}
                          </Paragraph>
                          
                          <Space wrap style={{ marginBottom: '12px' }}>
                            {post.tags.slice(0, 3).map(tag => (
                              <Tag key={tag} color="blue">
                                <TagOutlined /> {tag}
                              </Tag>
                            ))}
                            {post.tags.length > 3 && (
                              <Tag>+{post.tags.length - 3}</Tag>
                            )}
                          </Space>
                          
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text type="secondary">
                              <ClockCircleOutlined /> {post.readTime} 分鐘閱讀
                            </Text>
                            <Text type="secondary">
                              {formatDate(post.publishedAt)}
                            </Text>
                          </div>
                          
                          {post.featured && (
                            <Tag color="gold" style={{ marginTop: '8px' }}>
                              精選
                            </Tag>
                          )}
                        </div>
                      }
                    />
                  </Card>
                </Col>
              ))}
            </Row>

            {/* Pagination */}
            {blogData.pagination.totalPages > 1 && (
              <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <Pagination
                  current={blogData.pagination.currentPage}
                  total={blogData.pagination.totalPosts}
                  pageSize={queryParams.limit || 6}
                  showSizeChanger={false}
                  showQuickJumper
                  showTotal={(total, range) => 
                    `第 ${range[0]}-${range[1]} 篇，共 ${total} 篇文章`
                  }
                  onChange={handlePageChange}
                />
              </div>
            )}
          </>
        ) : (
          <Empty
            description="沒有找到相關文章"
            style={{ padding: '50px' }}
          />
        )}
      </Content>

      <Footer />
    </Layout>
  );
};

export default Blog; 