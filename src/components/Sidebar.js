import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const SidebarContainer = styled(motion.aside)`
  width: 250px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 2rem 0;
  position: fixed;
  left: 0;
  top: 70px;
  height: calc(100vh - 70px);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  z-index: 999;
  transform: translateX(${props => props.isOpen ? '0' : '-100%'});
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    width: 200px;
  }
`;

const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateX(10px);
  }

  &.active {
    background: rgba(255, 107, 107, 0.3);
    border-left: 4px solid #ff6b6b;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }

  &:hover::before {
    left: 100%;
  }
`;

const Icon = styled.span`
  margin-right: 1rem;
  font-size: 1.2rem;
`;

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', icon: '🏠', label: 'Dashboard' },
    { path: '/create', icon: '✍️', label: 'Create Post' },
    { path: '/posts', icon: '📝', label: 'All Posts' }
  ];

  return (
    <SidebarContainer
      isOpen={sidebarOpen}
      initial={false}
      animate={{ x: sidebarOpen ? 0 : -250 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <nav>
        {menuItems.map((item) => (
          <NavItem
            key={item.path}
            to={item.path}
            className={location.pathname === item.path ? 'active' : ''}
            onClick={() => setSidebarOpen(false)}
          >
            <Icon>{item.icon}</Icon>
            {item.label}
          </NavItem>
        ))}
      </nav>
    </SidebarContainer>
  );
};

export default Sidebar;
