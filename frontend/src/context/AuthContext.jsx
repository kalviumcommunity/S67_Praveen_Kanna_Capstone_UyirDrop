import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { getFromStorage, setInStorage, removeFromStorage } from '../utils/storage';

// Create the context
export const AuthContext = createContext({
  user: null,
  loading: true,
  login: () => {},
  register: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = getFromStorage('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Optional: Fetch user data from token
      axios.get('http://localhost:5001/api/auth/me')
        .then((res) => {
          setUser(res.data.user);
          setLoading(false);
        })
        .catch(() => {
          removeFromStorage('token');
          delete axios.defaults.headers.common['Authorization'];
          setUser(null);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      setError(null);
      const res = await axios.post('http://localhost:5001/api/auth/login', {
        email,
        password
      });
      const { token, user } = res.data;
      setInStorage('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);
      return user;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    }
  };

  const register = async (userData) => {
    try {
      setError(null);
      const res = await axios.post('http://localhost:5001/api/auth/register', userData);
      const { token, user } = res.data;
      setInStorage('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);
      return user;
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      throw err;
    }
  };

  const logout = () => {
    removeFromStorage('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};