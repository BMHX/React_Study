import { createContext, useContext } from 'react';

export const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    name: '访客',
    email: 'guest@example.com',
    avatar: '/src/assets/react.svg'
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);