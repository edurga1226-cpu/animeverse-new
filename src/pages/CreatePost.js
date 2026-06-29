import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import BlogForm from '../components/BlogForm';

const CreatePost = ({ addPost }) => {
  const navigate = useNavigate();

  const handleSubmit = (postData) => {
    addPost(postData);
    navigate('/posts');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="anime-text" style={{ marginBottom: '2rem' }}>
        Create New Post
      </h1>
      <BlogForm onSubmit={handleSubmit} />
    </motion.div>
  );
};

export default CreatePost;
