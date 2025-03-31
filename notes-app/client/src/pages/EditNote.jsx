import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message, Select, Tag } from 'antd';
import { getNote, updateNote } from '@/api/noteApi';
import { getCategories } from '@/api/categoryApi';
import { useStore } from '@/store/userStore';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar1 from '@/components/Navbar1';

const EditNote = () => {
  const navigate = useNavigate();
  const { user } = useStore();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [inputTag, setInputTag] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) navigate('/login');
  }, [navigate, user]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [noteData, categoriesData] = await Promise.all([
          getNote(id),
          getCategories(),
        ]);
        form.setFieldsValue({
          title: noteData.title,
          content: noteData.content,
          category: noteData.category,
        });
        setTags(noteData.tags || []);
        setCategories(categoriesData || []);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        message.error('获取数据失败');
        navigate('/notes');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, form, navigate]);

  const handleSubmit = async (values) => {
    try {
      const noteData = {
        ...values,
        tags,
        categoryId: values.categoryId,
        userId: user.id,
      };
      await updateNote(id, noteData);
      message.success('笔记更新成功');
      navigate('/notes');
    } catch (error) {
      console.error('Failed to update note:', error);
      message.error('更新笔记失败');
    }
  };

  const handleAddTag = () => {
    if (inputTag && !tags.includes(inputTag)) {
      setTags([...tags, inputTag]);
      setInputTag('');
    }
  };

  const handleRemoveTag = (removedTag) => {
    setTags(tags.filter((tag) => tag !== removedTag));
  };

  if (loading) {
    return (
      <>
        <Navbar1 />
        <div className="p-4">加载中...</div>
      </>
    );
  }

  return (
    <>
      <Navbar1 />
      <div className="p-4">
        <h1>编辑笔记</h1>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="max-w-2xl mx-auto"
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入笔记标题' }]}
          >
            <Input placeholder="输入笔记标题" />
          </Form.Item>

          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入笔记内容' }]}
          >
            <Input.TextArea rows={6} placeholder="输入笔记内容" />
          </Form.Item>

          <Form.Item
            label="分类"
            name="categoryId"
            rules={[{ required: true, message: '请选择笔记分类' }]}
          >
            <Select placeholder="选择笔记分类">
              {categories.map((category) => (
                <Select.Option key={category.id} value={category.id}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <div className="mb-4">
            <label className="block mb-2">标签</label>
            <div className="flex gap-2 mb-2">
              <Input
                value={inputTag}
                onChange={(e) => setInputTag(e.target.value)}
                placeholder="输入标签"
                onPressEnter={(e) => {
                  e.preventDefault();
                  handleAddTag();
                }}
              />
              <Button onClick={handleAddTag}>添加标签</Button>
            </div>
            <div className="flex gap-2 flex-wrap">
              {tags.map((tag) => (
                <Tag key={tag} closable onClose={() => handleRemoveTag(tag)}>
                  {tag}
                </Tag>
              ))}
            </div>
          </div>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              更新笔记
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default EditNote;
