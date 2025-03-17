import { useUser } from './context/UserContext';

export default function UpdateUser() {
  const { setUser } = useUser();
  const [formData, setFormData] = useState({ 
    name: '',
    email: '',
    avatar: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(prev => ({ ...prev, ...formData }));
    setFormData({ name: '', email: '', avatar: '' });
  };

  return (
    <div className="glass-card">
      <h3>更新用户信息</h3>
      <form onSubmit={handleSubmit} className="user-form">
        <input
          type="text"
          placeholder="姓名"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="neumorphic-input"
        />
        <input
          type="email"
          placeholder="邮箱"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          className="neumorphic-input"
        />
        <input
          type="url"
          placeholder="头像URL"
          value={formData.avatar}
          onChange={(e) => setFormData({...formData, avatar: e.target.value})}
          className="neumorphic-input"
        />
        <button type="submit" className="neumorphic-btn confirm">
          更新信息
        </button>
      </form>
    </div>
  );
}