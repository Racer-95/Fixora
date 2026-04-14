import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import type { IUser, AuthResponse } from '../types';

interface AuthContextType {
  user: IUser | null;
  loading: boolean;
  login: (data: any) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('fixora_token');
      if (token) {
        try {
          const res = await api.get('/auth/profile');
          if (res.data.success) {
            setUser(res.data.data);
          }
        } catch (err) {
          console.error('Failed to fetch profile:', err);
          localStorage.removeItem('fixora_token');
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (data: any) => {
    const res = await api.post<AuthResponse>('/auth/login', data);
    const { token, user: userData } = res.data;
    localStorage.setItem('fixora_token', token);
    setUser(userData);
  };

  const register = async (data: any) => {
    const res = await api.post<AuthResponse>('/auth/register', data);
    const { token, user: userData } = res.data;
    localStorage.setItem('fixora_token', token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('fixora_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
