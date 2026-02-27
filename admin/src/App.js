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
import UserAdd from './components/users/UserAdd';
import UserEdit from './components/users/UserEdit';
import ProfileSettings from './components/profile/ProfileSettings';
import AdminPartners from './components/partners/AdminPartners';
import AdminPortfolio from './components/portfolio/AdminPortfolio'; // Ensure the path is correct
import InquiryList from './components/inquiries/InquiryList';
import AnnouncementManager from './components/announcements/AnnouncementManager';
import PageList from './components/pages/PageList';
import PageEditor from './components/pages/PageEditor';

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
              <PrivateRoute roles={['Admin', 'admin', 'superadmin', 'Editor', 'editor']}>
                <Layout>
                  <NewsList />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/news/add"
            element={
              <PrivateRoute roles={['Admin', 'admin', 'superadmin', 'Editor', 'editor']}>
                <Layout>
                  <NewsAdd />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/news/edit/:id"
            element={
              <PrivateRoute roles={['Admin', 'admin', 'superadmin', 'Editor', 'editor']}>
                <Layout>
                  <NewsEdit />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/hackathon-images"
            element={
              <PrivateRoute roles={['Admin', 'admin', 'superadmin', 'Editor', 'editor']}>
                <Layout>
                  <ImageGallery />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/hackathon-images/upload"
            element={
              <PrivateRoute roles={['Admin', 'admin', 'superadmin', 'Editor', 'editor']}>
                <Layout>
                  <ImageUpload />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/partners"
            element={
              <PrivateRoute roles={['Admin', 'admin', 'superadmin']}>
                <Layout>
                  <AdminPartners />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/portfolio"
            element={
              <PrivateRoute roles={['Admin', 'admin', 'superadmin']}>
                <Layout>
                  <AdminPortfolio />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/users"
            element={
              <PrivateRoute roles={['Admin', 'admin', 'superadmin']}>
                <Layout>
                  <UserList />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/users/add"
            element={
              <PrivateRoute roles={['Admin', 'admin', 'superadmin']}>
                <Layout>
                  <UserAdd />
                </Layout>
              </PrivateRoute>
            }
          />

          <Route
            path="/users/edit/:id"
            element={
              <PrivateRoute roles={['Admin', 'admin', 'superadmin']}>
                <Layout>
                  <UserEdit />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/inquiries"
            element={
              <PrivateRoute roles={['Admin', 'admin', 'superadmin']}>
                <Layout>
                  <InquiryList />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/announcements"
            element={
              <PrivateRoute roles={['Admin', 'admin', 'superadmin']}>
                <Layout>
                  <AnnouncementManager />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/pages"
            element={
              <PrivateRoute roles={['Admin', 'admin', 'superadmin']}>
                <Layout>
                  <PageList />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/pages/add"
            element={
              <PrivateRoute roles={['Admin', 'admin', 'superadmin']}>
                <Layout>
                  <PageEditor />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/pages/edit/:id"
            element={
              <PrivateRoute roles={['Admin', 'admin', 'superadmin']}>
                <Layout>
                  <PageEditor />
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