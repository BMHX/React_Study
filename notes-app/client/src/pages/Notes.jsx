import { useEffect, useState } from 'react';
import { List, Card, Tag, Button, Space, Modal, message } from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from '@ant-design/icons';
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
      fetchNotes();
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

  if (!notes)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-lg backdrop-blur-sm bg-white/30 px-6 py-3 rounded-lg shadow-lg">
          加载中...
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="backdrop-blur-sm bg-white/30">
        <Navbar1 />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">我的笔记</h1>
            <Button
              type="primary"
              size="large"
              icon={<PlusOutlined />}
              onClick={() => navigate('/create-note')}
              className="flex items-center backdrop-blur-md bg-blue-500/90 border-0 hover:bg-blue-600/90"
            >
              创建笔记
            </Button>
          </div>

          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 2,
              lg: 3,
              xl: 3,
              xxl: 4,
            }}
            dataSource={notes}
            renderItem={(item) => (
              <List.Item>
                <Card
                  hoverable
                  className="backdrop-blur-md bg-white/70 border border-white/50 shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-white/80 h-[320px] overflow-hidden"
                  bodyStyle={{
                    height: '100%',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div className="flex flex-col flex-1">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2 text-gray-800 line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {item.content}
                      </p>
                    </div>

                    {item.tags && item.tags.length > 0 && (
                      <div className="mb-4 flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <Tag
                            color="cyan"
                            key={tag}
                            className="px-3 py-1 rounded-full backdrop-blur-sm bg-cyan-500/10"
                          >
                            {tag}
                          </Tag>
                        ))}
                      </div>
                    )}

                    <div className="flex justify-between items-center pt-4 border-t border-gray-200/50">
                      <Button
                        type="link"
                        icon={<EyeOutlined />}
                        onClick={() => navigate(`/notes/${item.id}`)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        查看
                      </Button>
                      <Space>
                        <Button
                          type="primary"
                          ghost
                          icon={<EditOutlined />}
                          onClick={() => navigate(`/notes/edit/${item.id}`)}
                          className="backdrop-blur-sm border-blue-400 text-blue-600 hover:text-blue-700 hover:border-blue-500"
                        >
                          编辑
                        </Button>
                        <Button
                          type="primary"
                          danger
                          ghost
                          icon={<DeleteOutlined />}
                          onClick={() => handleDeleteClick(item.id)}
                          className="backdrop-blur-sm"
                        >
                          删除
                        </Button>
                      </Space>
                    </div>
                  </div>
                </Card>
              </List.Item>
            )}
          />
        </div>
      </div>

      <Modal
        title="确认删除"
        open={deleteModalVisible}
        onOk={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        okText="确认"
        cancelText="取消"
        okButtonProps={{ danger: true }}
        className="custom-modal"
        modalRender={(modal) => (
          <div className="backdrop-blur-md bg-white/90 rounded-lg">{modal}</div>
        )}
      >
        <div className="py-4">
          <p className="text-lg">确定要删除这条笔记吗？此操作不可恢复。</p>
        </div>
      </Modal>
    </div>
  );
};

export default Notes;
