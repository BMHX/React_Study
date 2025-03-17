import { useUser } from './context/UserContext';

export default function UserProfile() {
  const { user } = useUser();

  return (
    <div className="glass-card profile-card">
      <div className="avatar-container">
        <img src={user.avatar} alt="用户头像" className="neumorphic-avatar" />
      </div>
      <div className="user-info">
        <h3>{user.name}</h3>
        <p>{user.email}</p>
      </div>
    </div>
  );
}