import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu, Space, Avatar, Button, Typography } from 'antd';
import {
  HomeOutlined,
  AppstoreOutlined,
  FileOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useStore } from '@/store/userStore';

const { Header } = Layout;
const { Text } = Typography;

const Navbar = () => {
  // 获取用户状态和登出方法
  const { user, logout } = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  // 处理登出
  const handleLogout = () => {
    if (window.confirm('确认退出？')) {
      logout();
      navigate('/login');
    }
  };

  // 根据当前路由路径获取选中的菜单项
  const selectedKeys = React.useMemo(() => {
    switch (location.pathname) {
      case '/':
        return ['home'];
      case '/categories':
        return ['categories'];
      case '/notes':
        return ['notes'];
      default:
        return [];
    }
  }, [location.pathname]);

  // 菜单项配置
  const menuItems = [
    {
      key: 'home',
      label: (
        <Space size="middle">
          <HomeOutlined />
          <span>首页</span>
        </Space>
      ),
      onClick: () => navigate('/'),
    },
    {
      key: 'categories',
      label: (
        <Space size="middle">
          <AppstoreOutlined />
          <span>分类</span>
        </Space>
      ),
      onClick: () => navigate('/categories'),
    },
    {
      key: 'notes',
      label: (
        <Space size="middle">
          <FileOutlined />
          <span>笔记</span>
        </Space>
      ),
      onClick: () => navigate('/notes'),
    },
  ];

  return (
    <Header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 24px',
        background: '#fff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
    >
      <div style={{ flex: 1 }}>
        <Menu
          mode="horizontal"
          selectedKeys={selectedKeys}
          items={menuItems}
          style={{ border: 'none' }}
        />
      </div>
      <div>
        {user ? (
          <Space size="middle" align="center">
            <Avatar
              size="small"
              src={user.avatar_url}
              icon={<UserOutlined />}
            />
            <Text style={{ color: 'rgba(0,0,0,0.85)' }}>
              {user.nickname || user.username}
            </Text>
            <Button type="link" onClick={handleLogout}>
              退出
            </Button>
          </Space>
        ) : (
          <Button type="primary" onClick={() => navigate('/login')}>
            登录
          </Button>
        )}
      </div>
    </Header>
  );
};

export default Navbar;
