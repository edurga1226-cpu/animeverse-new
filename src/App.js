import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import PostList from './pages/PostList';
import GlobalStyles from './styles/GlobalStyles';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const savedPosts = localStorage.getItem('animeBlogPosts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      // Sample data
      const samplePosts = [
        {
          id: 1,
          title: "Top 10 Anime of 2024",
          content: "Check out the amazing anime that dominated 2024...",
          status: "published",
          category: "Reviews",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 2,
          title: "Character Analysis: Eren Yeager",
          content: "A deep dive into one of anime's most controversial characters...",
          status: "draft",
          category: "Analysis",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
      setPosts(samplePosts);
      localStorage.setItem('animeBlogPosts', JSON.stringify(samplePosts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('animeBlogPosts', JSON.stringify(posts));
  }, [posts]);

  const addPost = (post) => {
    const newPost = {
      ...post,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setPosts([...posts, newPost]);
  };

  const updatePost = (id, updatedPost) => {
    setPosts(posts.map(post => 
      post.id === id 
        ? { ...post, ...updatedPost, updatedAt: new Date().toISOString() }
        : post
    ));
  };

  const deletePost = (id) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  const togglePostStatus = (id) => {
    setPosts(posts.map(post => 
      post.id === id 
        ? { ...post, status: post.status === 'draft' ? 'published' : 'draft' }
        : post
    ));
  };

  return (
    <div className="app">
      <GlobalStyles />
      <Header 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
      />
      <div className="main-container">
        <Sidebar 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen} 
        />
        <motion.main 
          className="content"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route 
              path="/dashboard" 
              element={<Dashboard posts={posts} />} 
            />
            <Route 
              path="/create" 
              element={<CreatePost addPost={addPost} />} 
            />
            <Route 
              path="/posts" 
              element={<PostList 
                posts={posts} 
                deletePost={deletePost}
                togglePostStatus={togglePostStatus}
              />} 
            />
            <Route 
              path="/edit/:id" 
              element={<EditPost 
                posts={posts} 
                updatePost={updatePost} 
              />} 
            />
          </Routes>
        </motion.main>
      </div>
    </div>
  );
};

export default App;
