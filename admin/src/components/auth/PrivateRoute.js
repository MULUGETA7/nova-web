import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const PrivateRoute = ({ children, roles = [] }) => {
  const { currentUser, getUserRole } = useAuth();
  const [userRole, setUserRole] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const checkRole = async () => {
      if (currentUser) {
        const role = await getUserRole();
        setUserRole(role);
      }
      setLoading(false);
    };
    checkRole();
  }, [currentUser, getUserRole]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (roles.length > 0 && !roles.includes(userRole)) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default PrivateRoute;
