import React from 'react';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useCheckAuthQuery } from './features/auth/authSlice';
import { setUser, clearUser } from './features/user/userSlice';
import Layout from './components/dashboard/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './components/dashboard/Profile';
import Products from './pages/Products';
import Cart from './pages/Cart';


const App = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const { data, error, isLoading } = useCheckAuthQuery(undefined, {
    skip: !token, // Skip the query if there's no token
  });
  const user = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    if (data?.userData) {
      // If authentication is successful, store user data globally
      dispatch(setUser(data.userData));
    } else if (error) {
      // Clear user info on error
      dispatch(clearUser());
    }
  }, [data, error, dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        {/* Redirect the root ("/") to login if no authenticated user */}
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />

        {/* Login and Register pages */}
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />

        {/* Dashboard (protected route) */}
        <Route path="/dashboard" element={
          user ? (
            <Layout>
              <Dashboard />
            </Layout>
          ) : (
            <Navigate to="/login" />
          )
        } />
        <Route path="/dashboard/profile" element={
          user ? (
            <Layout>
              <Profile />
            </Layout>
          ) : (
            <Navigate to="/login" />
          )
        } />

        <Route path="/dashboard/products" element={
          user ? (
            <Layout>
              <Products />
            </Layout>
          ) : (
            <Navigate to="/login" />
          )
        } />
        <Route path="/dashboard/cart" element={
          user ? (
            user.role === 'admin' ? (
              <Navigate to="/dashboard" />
            ) : (
              <Layout>
                <Cart />
              </Layout>
            )
          ) : (
            <Navigate to="/login" />
          )
        } />
      </Routes>
    </Router>
  );
};

export default App;

