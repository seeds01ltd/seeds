import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import adminApi from './AdminApi';

const AdminContext = createContext(null);

export function AdminProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      adminApi.setToken(token);
      adminApi.getMe()
        .then(data => setUser(data.user))
        .catch(() => { adminApi.setToken(null); setUser(null); })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email, password) => {
    const data = await adminApi.login(email, password);
    adminApi.setToken(data.accessToken);
    setUser(data.user);
    return data;
  }, []);

  const logout = useCallback(() => {
    adminApi.setToken(null);
    setUser(null);
  }, []);

  return (
    <AdminContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider');
  return ctx;
};