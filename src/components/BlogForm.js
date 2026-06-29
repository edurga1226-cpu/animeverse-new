import React, { useState } from 'react';
import { motion } from 'framer-motion';

const BlogForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    content: initialData.content || '',
    category: initialData.category || 'General',
    status: initialData.status || 'draft'
  });

  const categories = [
    'Reviews', 'Analysis', 'News', 'Recommendations', 
    'Character Study', 'Theory', 'General'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card"
    >
      <div className="form-group">
        <label className="form-label">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="form-input"
          placeholder="Enter blog post title..."
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="form-select"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Content</label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          className="form-textarea"
          placeholder="Write your blog content here..."
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="form-select"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      <motion.button
        type="submit"
        className="btn btn-primary"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {initialData.id ? 'Update Post' : 'Create Post'}
      </motion.button>
    </motion.form>
  );
};

export default BlogForm;
