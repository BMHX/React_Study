import { Form, Input, Button, Typography, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { registerUser } from '@/api/userApi';
import { useStore } from '@/store/userStore';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const { Title } = Typography;

const Register = () => {
  const { setUser } = useStore();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await registerUser(values);
      setUser(response.data); // 设置用户信息
      alert('注册成功');
      navigate('/login'); // 跳转到登录页面
    } catch (error) {
      console.error('Registration failed:', error);
      message.error('注册失败，请重试');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-blue-200">
      <div className="bg-white p-8 rounded-md shadow-lg w-150 mx-auto mt-20">
        <Title level={2} className="text-center mb-6">
          注册
        </Title>
        <Form name="register" onFinish={onFinish} className="space-y-12">
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名！' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="用户名"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: '请输入邮箱！' },
              { type: 'email', message: '请输入有效的邮箱地址！' },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="邮箱"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: '请输入密码！' },
              { min: 6, message: '密码长度至少6位！' },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="密码"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full py-5"
              block
            >
              注册
            </Button>
          </Form.Item>
        </Form>
        <div className="text-center mt-4">
          已有账号？
          <Link to="/login" className="text-blue-500 hover:text-blue-700">
            去登录
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
