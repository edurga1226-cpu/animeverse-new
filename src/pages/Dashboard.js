import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const StatCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const StatLabel = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
`;

const QuickActions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

const ActionCard = styled(Link)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 2rem;
  text-align: center;
  text-decoration: none;
  color: white;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 45px rgba(0, 0, 0, 0.2);
    background: rgba(255, 255, 255, 0.15);
  }
`;

const ActionIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const ActionTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
`;

const RecentPosts = styled.div`
  .post-item {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 10px;
    padding: 1rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const Dashboard = ({ posts }) => {
  const draftPosts = posts.filter(post => post.status === 'draft').length;
  const publishedPosts = posts.filter(post => post.status === 'published').length;

  const recentPosts = [...posts]
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 5);

  return (
    <DashboardContainer>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="anime-text"
        style={{ marginBottom: '2rem', fontSize: '2.5rem' }}
      >
        Dashboard
      </motion.h1>

      <StatsGrid>
        <StatCard
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <StatNumber>{posts.length}</StatNumber>
          <StatLabel>Total Posts</StatLabel>
        </StatCard>

        <StatCard
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <StatNumber>{publishedPosts}</StatNumber>
          <StatLabel>Published</StatLabel>
        </StatCard>

        <StatCard
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <StatNumber>{draftPosts}</StatNumber>
          <StatLabel>Drafts</StatLabel>
        </StatCard>
      </StatsGrid>

      <QuickActions>
        <ActionCard to="/create">
          <ActionIcon>✍️</ActionIcon>
          <ActionTitle>Create New Post</ActionTitle>
        </ActionCard>

        <ActionCard to="/posts">
          <ActionIcon>📚</ActionIcon>
          <ActionTitle>View All Posts</ActionTitle>
        </ActionCard>
      </QuickActions>

      <div className="card">
        <h2 style={{ color: 'white', marginBottom: '1.5rem' }}>Recent Posts</h2>
        <RecentPosts>
          {recentPosts.map(post => (
            <motion.div
              key={post.id}
              className="post-item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div>
                <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>
                  {post.title}
                </div>
                <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>
                  {new Date(post.updatedAt).toLocaleDateString()}
                </div>
              </div>
              <span className={`badge badge-${post.status}`}>
                {post.status}
              </span>
            </motion.div>
          ))}
        </RecentPosts>
      </div>
    </DashboardContainer>
  );
};

export default Dashboard;
