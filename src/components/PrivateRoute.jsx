import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('https://blog-post-backend-1h11.onrender.com/api/auth/check', {
          credentials: 'include'
        });
        const data = await res.json();
        if (res.ok) {
          setUser(data.user); // or whatever your backend returns
        }
      } catch {
        setUser(null);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};