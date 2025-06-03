import React, { useEffect, useRef } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress, Box } from '@mui/material';
import { getProfile } from '../store/slices/authSlice';

const AdminRoute = ({ children }) => {
  const { isAuthenticated, user, loading, authChecked } = useSelector((state) => state.auth);
  const location = useLocation();
  const dispatch = useDispatch();
  const profileFetched = useRef(false);

  // If user is authenticated but user object is missing, fetch profile
  useEffect(() => {
    if (isAuthenticated && !user && !loading && !profileFetched.current) {
      profileFetched.current = true;
      dispatch(getProfile());
    }
  }, [isAuthenticated, user, loading, dispatch]);

  // If auth hasn't been checked yet and we're not loading, check it
  useEffect(() => {
    if (!authChecked && !loading && !profileFetched.current) {
      profileFetched.current = true;
      dispatch(getProfile());
    }
  }, [authChecked, loading, dispatch]);

  // Show loading while checking authentication or fetching user data
  if (loading || !authChecked || (isAuthenticated && !user && profileFetched.current)) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  // Check if user is authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated but no user object after profile fetch, something is wrong
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check admin role
  if (user.role !== 'admin') {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default AdminRoute;
