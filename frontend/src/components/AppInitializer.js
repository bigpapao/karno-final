import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth, initializeAuth, syncGuestCart } from '../store/slices/authSlice';
import { initializeCart, fetchCart } from '../store/slices/cartSlice';
import { guestCartUtils } from '../utils/guestCart';

const AppInitializer = ({ children }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, user, authChecked, loading } = useSelector((state) => state.auth);
  const authCheckAttempted = useRef(false);
  const cartInitialized = useRef(false);
  const appInitialized = useRef(false);
  const wasEverAuthenticated = useRef(false); // Track if user was ever authenticated in this session

  // Initialize app on mount
  useEffect(() => {
    if (!appInitialized.current) {
      appInitialized.current = true;
      dispatch(initializeAuth());
    }
  }, [dispatch]);

  // Check authentication status
  useEffect(() => {
    if (!authCheckAttempted.current && !loading && appInitialized.current) {
      authCheckAttempted.current = true;
      dispatch(checkAuth());
    }
  }, [dispatch, loading]);

  // Track if user was ever authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      wasEverAuthenticated.current = true;
    }
  }, [isAuthenticated, user]);

  // Handle cart initialization based on auth state
  useEffect(() => {
    if (authChecked && !loading) {
      if (isAuthenticated && user) {
        // User is authenticated - fetch user cart and sync guest cart if needed
        if (!cartInitialized.current) {
          cartInitialized.current = true;
          
          // Check if there's a guest cart to sync
          const guestCart = guestCartUtils.getCart();
          if (guestCart && guestCart.length > 0) {
            // Sync guest cart with user cart
            dispatch(syncGuestCart(guestCart));
          } else {
            // Just fetch user cart
            dispatch(fetchCart());
          }
        }
      } else {
        // User is not authenticated
        if (wasEverAuthenticated.current) {
          // User was authenticated but now isn't (logged out)
          cartInitialized.current = false;
          wasEverAuthenticated.current = false;
        }
        
        // Initialize guest cart if not already done
        if (!cartInitialized.current) {
          cartInitialized.current = true;
          dispatch(initializeCart());
        }
      }
    }
  }, [isAuthenticated, user, authChecked, loading, dispatch]);

  return children;
};

export default AppInitializer;