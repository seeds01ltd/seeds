import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import api from '../api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        api.auth.getMe(session.access_token).then(setUser).catch(() => setUser(null));
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session && (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED')) {
        api.auth.getMe(session.access_token).then(setUser).catch(() => setUser(null));
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => subscription?.unsubscribe();
  }, []);

  const login = useCallback(async (email, password) => {
    const data = await api.auth.login({ email, password });
    setUser(data.user);
    return data;
  }, []);

  const register = useCallback(async (form) => {
    const data = await api.auth.register(form);
    if (data.session) {
      await supabase.auth.setSession(data.session);
    }
    setUser(data.user);
    return data;
  }, []);

  const logout = useCallback(async () => {
    await api.auth.logout();
    setUser(null);
  }, []);

  const updateProfile = useCallback(async (updates) => {
    if (!user) throw new Error('Not authenticated');
    const updated = await api.auth.updateProfile(user.id, updates);
    setUser(updated);
    return updated;
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
