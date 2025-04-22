import { useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext, initialAuthState } from '../context/AuthContext';
import { getFromStorage, setInStorage, removeFromStorage } from '../utils/storage';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(initialAuthState.user);
  const [loading, setLoading] = useState(initialAuthState.loading);

  useEffect(() => {
    const initAuth = async () => {
      const token = getFromStorage('token');
      if (token) {
        try {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const response = await axios.get('http://localhost:5001/api/auth/me');
          setUser(response.data);
        } catch (error) {
          removeFromStorage('token');
          delete axios.defaults.headers.common['Authorization'];
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (email, password) => {
    const res = await axios.post('http://localhost:5001/api/auth/login', {
      email,
      password
    });
    const { token, user } = res.data;
    setInStorage('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(user);
    return user;
  };

  const register = async (userData) => {
    const response = await axios.post('http://localhost:5001/api/auth/register', userData);
    const { token, user } = response.data;
    setInStorage('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(user);
    return user;
  };

  const logout = () => {
    removeFromStorage('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};