import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import BlogForm from '../components/BlogForm';

const EditPost = ({ posts, updatePost }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = posts.find(p => p.id === parseInt(id));

  if (!post) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ color: 'white', textAlign: 'center', padding: '2rem' }}
      >
        <h1>Post not found</h1>
        <button 
          onClick={() => navigate('/posts')}
          className="btn btn-primary"
          style={{ marginTop: '1rem' }}
        >
          Back to Posts
        </button>
      </motion.div>
    );
  }

  const handleSubmit = (postData) => {
    updatePost(post.id, postData);
    navigate('/posts');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="anime-text" style={{ marginBottom: '2rem' }}>
        Edit Post
      </h1>
      <BlogForm 
        onSubmit={handleSubmit} 
        initialData={post}
      />
    </motion.div>
  );
};

export default EditPost;
