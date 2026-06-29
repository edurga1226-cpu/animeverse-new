import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const PostCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 45px rgba(0, 0, 0, 0.2);
  }
`;

const PostTitle = styled.h3`
  color: white;
  margin-bottom: 0.5rem;
  font-size: 1.3rem;
`;

const PostContent = styled.p`
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1rem;
  line-height: 1.6;
`;

const PostMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: white;
  padding: 0.5rem;
  margin-left: 0.5rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }
`;

const BlogPost = ({ post, onDelete, onToggleStatus }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <PostCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
    >
      <PostTitle>{post.title}</PostTitle>
      <PostContent>{post.content.substring(0, 100)}...</PostContent>
      <PostMeta>
        <span>{formatDate(post.createdAt)}</span>
        <span className={`badge badge-${post.status}`}>
          {post.status}
        </span>
      </PostMeta>
      <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
        <Link to={`/edit/${post.id}`} className="btn btn-secondary">
          Edit
        </Link>
        <ActionButton 
          onClick={() => onToggleStatus(post.id)}
          className={post.status === 'draft' ? 'btn-success' : 'btn-warning'}
        >
          {post.status === 'draft' ? 'Publish' : 'Unpublish'}
        </ActionButton>
        <ActionButton 
          onClick={() => onDelete(post.id)}
          className="btn-danger"
        >
          Delete
        </ActionButton>
      </div>
    </PostCard>
  );
};

export default BlogPost;
