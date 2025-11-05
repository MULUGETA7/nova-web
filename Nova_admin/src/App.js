import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/auth/PrivateRoute';
import Layout from './components/layout/Layout'; // Import the Layout component

// Auth Pages
import Login from './components/auth/Login';

// Protected Pages
import Dashboard from './components/dashboard/Dashboard';
import NewsList from './components/news/NewsList';
import NewsAdd from './components/news/NewsAdd';
import NewsEdit from './components/news/NewsEdit';
import ImageGallery from './components/hackathon/ImageGallery';
import ImageUpload from './components/hackathon/ImageUpload';
import UserList from './components/users/UserList';
import UserEdit from './components/users/UserEdit';
import ProfileSettings from './components/profile/ProfileSettings';
import AdminPartners from './components/partners/AdminPartners';
import AdminPortfolio from './components/portfolio/AdminPortfolio'; // Ensure the path is correct

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
         
          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </PrivateRoute>
            } 
          />
          <Route 
            path="/admin-dashboard" 
            element={
              <PrivateRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </PrivateRoute>
            } 
          />
          <Route 
            path="/news" 
            element={
              <PrivateRoute roles={['Admin', 'Editor']}>
                <Layout>
                  <NewsList />
                </Layout>
              </PrivateRoute>
            } 
          />
          <Route 
            path="/news/add" 
            element={
              <PrivateRoute roles={['Admin', 'Editor']}>
                <Layout>
                  <NewsAdd />
                </Layout>
              </PrivateRoute>
            } 
          />
          <Route 
            path="/news/edit/:id" 
            element={
              <PrivateRoute roles={['Admin', 'Editor']}>
                <Layout>
                  <NewsEdit />
                </Layout>
              </PrivateRoute>
            } 
          />
          <Route 
            path="/hackathon-images" 
            element={
              <PrivateRoute roles={['Admin', 'Editor']}>
                <Layout>
                  <ImageGallery />
                </Layout>
              </PrivateRoute>
            } 
          />
          <Route 
            path="/hackathon-images/upload" 
            element={
              <PrivateRoute roles={['Admin', 'Editor']}>
                <Layout>
                  <ImageUpload />
                </Layout>
              </PrivateRoute>
            } 
          />
          <Route 
            path="/admin/partners" 
            element={
              <PrivateRoute roles={['Admin']}>
                <Layout>
                  <AdminPartners />
                </Layout>
              </PrivateRoute>
            } 
          />
          <Route 
            path="/admin/portfolio" 
            element={
              <PrivateRoute roles={['Admin']}>
                <Layout>
                  <AdminPortfolio />
                </Layout>
              </PrivateRoute>
            } 
          />
          <Route 
            path="/users" 
            element={
              <PrivateRoute roles={['Admin']}>
                <Layout>
                  <UserList />
                </Layout>
              </PrivateRoute>
            } 
          />
         
          <Route 
            path="/users/edit/:id" 
            element={
              <PrivateRoute roles={['Admin']}>
                <Layout>
                  <UserEdit />
                </Layout>
              </PrivateRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <PrivateRoute>
                <Layout>
                  <ProfileSettings />
                </Layout>
              </PrivateRoute>
            } 
          />
          
          {/* Redirect to Login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;