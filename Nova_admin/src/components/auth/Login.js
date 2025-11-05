import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'; // Use environment variable with fallback

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();  // Hook to handle navigation

  const handleLogin = async (email, password) => {
    try {
      console.log('API_BASE_URL:', API_BASE_URL);
      console.log('Sending Login Request to:', `${API_BASE_URL}/api/auth/login`);
      console.log('Login data:', { email, password });

      const response = await axios.post(
        `${API_BASE_URL}/api/auth/login`,
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      console.log('Login Response:', response.data);

      const { token, role } = response.data;

      // Store the token and user info in localStorage
      localStorage.setItem('user', JSON.stringify(response.data));
      localStorage.setItem('token', token);

      // Redirect to admin dashboard if role is admin, else to user dashboard
      if (role === 'admin') {
        navigate('/admin-dashboard');  // Admin dashboard route
      } else {
        navigate('/dashboard');  // Regular user dashboard route
      }
      
    } catch (error) {
      console.error('Login Error:', error.response ? error.response.data : error.message);
      setError('Invalid email or password');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await handleLogin(email, password);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center">NovaLabs Admin</h1>
        <p className="text-sm text-gray-600 text-center">Enter your credentials to login</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? '🙈' : '👁'}
              </button>
            </div>
          </div>

          {error && <div className="text-red-600">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-2 rounded-md"
          >
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;