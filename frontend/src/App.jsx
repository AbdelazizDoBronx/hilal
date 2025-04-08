import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useCheckAuthQuery } from './features/apiSlice';
import { setUser, clearUser } from './features/userSlice';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard'; 

const App = () => {
  const { data, error, isLoading } = useCheckAuthQuery();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    if (data && data.user) {
      // If authentication is successful, store user data globally
      dispatch(setUser(data.user));
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
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
