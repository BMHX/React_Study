import { useEffect, useState } from 'react';
import { List, Card, Tag, Button, Space, Modal, message } from 'antd';
import { getNotes, deleteNote } from '@/api/noteApi';
import { useStore } from '@/store/userStore';
import { useNavigate } from 'react-router-dom';
import Navbar1 from '@/components/Navbar1';

const Notes = () => {
  const navigate = useNavigate();
  const { user } = useStore();
  const [notes, setNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  useEffect(() => {
    if (!user) navigate('/login');
  }, [navigate]);

  const fetchNotes = async () => {
    try {
      const fetchNotesData = await getNotes(user.id);
      setNotes(fetchNotesData || []);
    } catch (error) {
      console.error('Failed to fetch notes:', error);
      message.error('获取笔记失败');
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleDeleteClick = (noteId) => {
    setSelectedNoteId(noteId);
    setDeleteModalVisible(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteNote(selectedNoteId);
      message.success('笔记删除成功');
      fetchNotes(); // 重新获取笔记列表
      setDeleteModalVisible(false);
    } catch (error) {
      console.error('Failed to delete note:', error);
      message.error('删除笔记失败');
    }
  };

  const handleDeleteCancel = () => {
    setSelectedNoteId(null);
    setDeleteModalVisible(false);
  };

  if (!notes) return <div>Loading...</div>;

  return (
    <>
      <Navbar1 />
      <div className="flex justify-between items-center p-6">
        <h1>笔记列表</h1>
        <Button type="primary" onClick={() => navigate('/create-note')}>
          创建笔记
        </Button>
      </div>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={notes}
        renderItem={(item) => (
          <Card className="bg-blue-100 m-2" hoverable>
            <Card.Meta
              title={item.title}
              description={item.content.substring(0, 100) + '...'}
            />
            {item.tags && item.tags.length > 0 && (
              <div className="my-4">
                {item.tags.map((tag) => (
                  <Tag color="cyan" key={tag}>
                    {tag}
                  </Tag>
                ))}
              </div>
            )}
            <div className="flex justify-between mt-4">
              <Button type="link" onClick={() => navigate(`/notes/${item.id}`)}>
                查看详情
              </Button>
              <div className="space-x-2">
                <Button
                  type="primary"
                  onClick={() => navigate(`/notes/edit/${item.id}`)}
                >
                  编辑
                </Button>
                <Button
                  type="primary"
                  danger
                  onClick={() => handleDeleteClick(item.id)}
                >
                  删除
                </Button>
              </div>
            </div>
          </Card>
        )}
      />

      <Modal
        title="确认删除"
        open={deleteModalVisible}
        onOk={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        okText="确认"
        cancelText="取消"
      >
        <p>确定要删除这条笔记吗？此操作不可恢复。</p>
      </Modal>
    </>
  );
};

export default Notes;
