import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    // Force yourself as Admin for now
    return token && user
      ? { ...JSON.parse(user), role: 'Admin' } // Override role
      : { name: 'Tewestya', email: 'you@example.com', role: 'Admin' }; // Default admin
  });

  const [loading] = useState(false);

  // Set up axios interceptor for JWT
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    return () => {
      delete axios.defaults.headers.common['Authorization'];
    };
  }, []);

  async function signup(email, password, name, role) {
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, {
        email,
        password,
        name,
        role
      });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setCurrentUser(user);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to sign up');
    }
  }

  async function login(email, password) {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setCurrentUser(user);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to login');
    }
  }

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    setCurrentUser(null);
  }

  async function resetPassword(email) {
    try {
      await axios.post(`${API_URL}/auth/reset-password`, { email });
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to reset password');
    }
  }

  async function getUserRole() {
    if (!currentUser) return null;
    return currentUser.role;
  }

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    getUserRole
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
