import React, { useState } from 'react';
import { motion } from 'framer-motion';
import BlogPost from '../components/BlogPost';

const PostList = ({ posts, deletePost, togglePostStatus }) => {
  const [filter, setFilter] = useState('all');

  const filteredPosts = posts.filter(post => {
    if (filter === 'all') return true;
    return post.status === filter;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '2rem' 
      }}>
        <h1 className="anime-text">All Posts</h1>
        <div>
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="form-select"
            style={{ minWidth: '120px' }}
          >
            <option value="all">All Posts</option>
            <option value="draft">Drafts</option>
            <option value="published">Published</option>
          </select>
        </div>
      </div>

      <div>
        {filteredPosts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ 
              textAlign: 'center', 
              padding: '3rem', 
              color: 'rgba(255,255,255,0.7)' 
            }}
          >
            <h2>No posts found</h2>
            <p>Start creating your first anime blog post!</p>
          </motion.div>
        ) : (
          filteredPosts.map(post => (
            <BlogPost
              key={post.id}
              post={post}
              onDelete={deletePost}
              onToggleStatus={togglePostStatus}
            />
          ))
        )}
      </div>
    </motion.div>
  );
};

export default PostList;
