import {
  Layout,
  Typography,
  Card,
  Row,
  Col,
  Button,
  Space,
  Avatar,
  Tag,
} from "antd";
import {
  UserOutlined,
  RocketOutlined,
  MailOutlined,
  HeartOutlined,
  BookOutlined,
  ClockCircleOutlined,
  GithubOutlined,
  LinkedinOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useUser } from "@/hooks";
import { useFeaturedBlogPosts } from "@/hooks/useBlog";

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

const Home = () => {
  const navigate = useNavigate();
  const { userInfo, loading, error } = useUser();
  const { data: featuredPosts } = useFeaturedBlogPosts();

  // 計算工作經驗年數
  const calculateExperience = () => {
    if (!userInfo?.workFrom) {
      return userInfo?.experience || 0;
    }
    const currentYear = new Date().getFullYear();
    return currentYear - userInfo.workFrom;
  };

  // 如果發生錯誤，顯示錯誤訊息
  if (error) {
    return (
      <Layout className="layout" style={{ minHeight: "100vh" }}>
        <Header />
        <Content style={{ padding: "50px", textAlign: "center" }}>
          <Title level={2} type="danger">
            載入失敗
          </Title>
          <Paragraph>抱歉，無法載入個人資訊。請稍後再試。</Paragraph>
        </Content>
        <Footer />
      </Layout>
    );
  }

  const formatDate = (date: Date | undefined) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("zh-TW", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Layout className="layout" style={{ minHeight: "100vh" }}>
      <Header />

      <Content style={{ padding: "0 50px" }}>
        {/* Hero Section */}
        <div
          style={{
            background: userInfo?.backgroundImage
              ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${userInfo.backgroundImage}) no-repeat center / cover`
              : "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
            minHeight: "400px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "80px 0",
            textAlign: "center",
            marginBottom: "50px",
            color: userInfo?.backgroundImage ? "white" : "inherit",
          }}
        >
          <Avatar
            size={120}
            src={userInfo?.avatar}
            icon={<UserOutlined />}
            style={{ marginBottom: "20px", backgroundColor: "#667eea" }}
          />
          <Title
            level={1}
            style={{
              marginBottom: "10px",
              color: userInfo?.backgroundImage ? "white" : "inherit",
            }}
          >
            {loading ? "Loading..." : userInfo?.name}
          </Title>
          <Title
            level={3}
            type="secondary"
            style={{
              marginBottom: "20px",
              color: userInfo?.backgroundImage
                ? "rgba(255, 255, 255, 0.8)"
                : "inherit",
            }}
          >
            {userInfo?.title}
          </Title>
          <Paragraph
            style={{
              fontSize: "18px",
              maxWidth: "600px",
              margin: "0 auto",
              color: userInfo?.backgroundImage
                ? "rgba(255, 255, 255, 0.9)"
                : "inherit",
            }}
          >
            {userInfo?.description}
          </Paragraph>

          {/* Social Media Links */}
          {userInfo &&
            (userInfo.githubUrl ||
              userInfo.linkedinUrl ||
              userInfo.websiteUrl) && (
              <Space size="large" style={{ marginTop: "20px" }}>
                {userInfo.githubUrl && (
                  <Button
                    type="text"
                    icon={<GithubOutlined />}
                    href={userInfo.githubUrl}
                    target="_blank"
                    style={{
                      color: userInfo?.backgroundImage ? "white" : "inherit",
                    }}
                  >
                    GitHub
                  </Button>
                )}
                {userInfo.linkedinUrl && (
                  <Button
                    type="text"
                    icon={<LinkedinOutlined />}
                    href={userInfo.linkedinUrl}
                    target="_blank"
                    style={{
                      color: userInfo?.backgroundImage ? "white" : "inherit",
                    }}
                  >
                    LinkedIn
                  </Button>
                )}
                {userInfo.websiteUrl && (
                  <Button
                    type="text"
                    icon={<GlobalOutlined />}
                    href={userInfo.websiteUrl}
                    target="_blank"
                    style={{
                      color: userInfo?.backgroundImage ? "white" : "inherit",
                    }}
                  >
                    Website
                  </Button>
                )}
              </Space>
            )}

          <Space size="large" style={{ marginTop: "30px" }}>
            <Button
              type="primary"
              size="large"
              icon={<RocketOutlined />}
              onClick={() => navigate("/projects")}
            >
              View Projects
            </Button>
            <Button
              size="large"
              icon={<BookOutlined />}
              onClick={() => navigate("/blog")}
            >
              閱讀部落格
            </Button>
            <Button
              size="large"
              icon={<MailOutlined />}
              href={`mailto:${userInfo?.email}`}
            >
              Contact Me
            </Button>
          </Space>
        </div>

        {/* Skills Section */}
        <Row gutter={[24, 24]} style={{ marginBottom: "50px" }}>
          <Col xs={24} md={12}>
            <Card title="技術技能" bordered={false} style={{ height: "100%" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {userInfo?.skills?.map((skill: string, index: number) => (
                  <Tag key={index} color="blue" style={{ marginBottom: "8px" }}>
                    {skill}
                  </Tag>
                ))}
              </div>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card title="工作經驗" bordered={false} style={{ height: "100%" }}>
              <Title level={2} style={{ color: "#667eea", margin: 0 }}>
                {calculateExperience()}
              </Title>
              <Text type="secondary">年開發經驗</Text>
              {userInfo?.workFrom && (
                <div style={{ marginTop: "8px" }}>
                  <Text type="secondary">從 {userInfo.workFrom} 年開始</Text>
                </div>
              )}
              {userInfo?.location && (
                <div style={{ marginTop: "8px" }}>
                  <Text type="secondary">📍 {userInfo.location}</Text>
                </div>
              )}
            </Card>
          </Col>
        </Row>

        {/* Featured Blog Posts Section */}
        {featuredPosts && featuredPosts.length > 0 && (
          <Card
            title="精選文章"
            bordered={false}
            style={{ marginBottom: "50px" }}
          >
            <Row gutter={[24, 24]}>
              {featuredPosts.slice(0, 3).map((post) => (
                <Col xs={24} md={8} key={post.id}>
                  <Card
                    hoverable
                    style={{ height: "100%" }}
                    cover={
                      <div
                        style={{
                          height: "150px",
                          background:
                            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <BookOutlined
                          style={{ fontSize: "32px", color: "white" }}
                        />
                      </div>
                    }
                    actions={[
                      <Button
                        type="link"
                        key="read"
                        onClick={() => navigate(`/blog/post/${post.slug}`)}
                      >
                        閱讀全文
                      </Button>,
                    ]}
                  >
                    <Card.Meta
                      title={
                        <Title level={5} style={{ marginBottom: "8px" }}>
                          {post.title}
                        </Title>
                      }
                      description={
                        <div>
                          <Paragraph
                            ellipsis={{ rows: 2 }}
                            style={{ marginBottom: "12px", color: "#666" }}
                          >
                            {post.excerpt}
                          </Paragraph>

                          <Space wrap style={{ marginBottom: "8px" }}>
                            {post.tags.slice(0, 2).map((tag) => (
                              <Tag key={tag} color="blue">
                                {tag}
                              </Tag>
                            ))}
                          </Space>

                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <Text type="secondary" style={{ fontSize: "12px" }}>
                              <ClockCircleOutlined /> {post.readTime} 分鐘
                            </Text>
                            <Text type="secondary" style={{ fontSize: "12px" }}>
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
            <div style={{ textAlign: "center", marginTop: "24px" }}>
              <Button
                type="primary"
                size="large"
                onClick={() => navigate("/blog")}
              >
                查看更多文章
              </Button>
            </div>
          </Card>
        )}

        {/* About Section */}
        <Card title="關於我" bordered={false} style={{ marginBottom: "50px" }}>
          <Row gutter={24}>
            <Col xs={24} md={12}>
              <Paragraph style={{ fontSize: "16px", lineHeight: "1.8" }}>
                {userInfo?.aboutMe ||
                  `我是一名充滿熱情的全端開發者，專注於創建高品質的Web應用程式。
                從Rails到React，我一直在學習和適應最新的技術趨勢。`}
              </Paragraph>
              <Paragraph style={{ fontSize: "16px", lineHeight: "1.8" }}>
                目前正在探索現代化的前端開發技術，包括TypeScript、React Hooks和
                各種實用的開發工具，如ahooks等。
              </Paragraph>
            </Col>
            <Col xs={24} md={12}>
              <div style={{ textAlign: "center" }}>
                <HeartOutlined style={{ fontSize: "48px", color: "#ff4d4f" }} />
                <Paragraph style={{ marginTop: "16px" }}>
                  熱愛程式設計，持續學習新技術
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

