import React, { useEffect, useState } from 'react';
import { List, Card } from 'antd';
import { getCategories } from '@/api/categoryApi';
import { useStore } from '@/store/userStore';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';

const Categories = () => {
  const navigate = useNavigate();
  const { user } = useStore();

  // 检查登录状态
  useEffect(() => {
    if (!user) navigate('/login');
  }, [navigate, user]);

  // 管理分类数据
  const [categories, setCategories] = useState([]);

  // 获取分类数据
  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        alert('获取分类失败');
      }
    };

    fetchCategoriesData();
  }, []);

  return (
    <>
      <Navbar />
      <div>
        <h1>分类列表</h1>
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={categories}
          renderItem={(item) => (
            <Card hoverable className="m-2">
              <Card.Meta title={item.name} />
              <a href={`/notes/categories/${item.id}`}>查看分类笔记</a>
            </Card>
          )}
        />
      </div>
    </>
  );
};

export default Categories;
