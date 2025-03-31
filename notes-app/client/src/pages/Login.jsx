import { Form, Input, Button, Typography, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { loginUser } from '@/api/userApi';
import { useStore } from '@/store/userStore';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const { Title } = Typography;

const Login = () => {
  const { setUser } = useStore();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const response = await loginUser(values);
      setUser(response); // 设置用户信息
      // console.log(response);
      message.success('登录成功');
      navigate('/'); // 跳转到主页
    } catch (error) {
      console.error('Login failed:', error);
      message.error('用户名或密码错误');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-blue-200">
      <div className="bg-white p-8 rounded-md shadow-lg w-150 mx-auto mt-20">
        <Title level={2} className="text-center mb-6">
          登录
        </Title>
        <Form
          name="login_form"
          onFinish={onSubmit}
          className="space-y-12"
          initialValues={{
            username: 'admin',
            password: '123456',
          }}
        >
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
            name="password"
            rules={[{ required: true, message: '请输入密码！' }]}
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
              登录
            </Button>
          </Form.Item>
        </Form>
        <div className="text-center mt-4">
          还没有账号？
          <Link to="/register" className="text-blue-500 hover:text-blue-700">
            去注册
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
