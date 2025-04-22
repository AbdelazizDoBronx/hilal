import { useState } from 'react';
import { Menu, Bell, Search, User, LogOut, ShoppingCart } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useLogoutMutation } from '../../features/auth/authSlice';
import { useSelector } from 'react-redux';
import Logo from '../ui/Logo';
import { motion, AnimatePresence } from 'framer-motion';
import { useGetCartQuery } from '../../features/cart/cartSlice';

export default function Header({ toggleSidebar, isSidebarOpen }) {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const [logout, { isLoading }] = useLogoutMutation();
  const user = useSelector((state) => state.user.userInfo);
  const { data: cartItems = [] } = useGetCartQuery(undefined, {
    skip: user?.role === 'admin'
  });

  const cartItemCount = cartItems?.length || 0; const handleLogout = async () => {
    try {
      await logout().unwrap();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-30 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-x-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: isSidebarOpen ? 0 : 1,
              scale: isSidebarOpen ? 0.9 : 1,
              width: isSidebarOpen ? 0 : 'auto'
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg bg-indigo-50 hover:bg-indigo-100 transition-colors duration-300 text-indigo-600"
            >
              <Menu size={20} />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{
              opacity: isSidebarOpen ? 0 : 1,
              x: isSidebarOpen ? -20 : 0,
              width: isSidebarOpen ? 0 : 'auto'
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div
              onClick={() => navigate('/dashboard')}
              className="p-4 border-b border-gray-100 flex items-center justify-between ">
              <Logo variant="full_logo" size="md" className="h-8" />
            </div>
          </motion.div>
        </div>

        <div className="flex-1 max-w-2xl mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400" size={18} />
            <input
              type="search"
              placeholder="Rechercher..."
              className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 shadow-sm"
            />
          </div>
        </div>

        <div className="flex items-center gap-x-4">
          {/* Cart Icon with Counter */}
          {user?.role !== 'admin' && (
            <button
              onClick={() => navigate('/dashboard/cart')}
              className="p-2 rounded-lg hover:bg-indigo-50 transition-colors duration-300 relative"
            >
              <ShoppingCart size={20} className="text-indigo-600" />
              {cartItemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full"
                >
                  {cartItemCount}
                </motion.span>
              )}
            </button>
          )}
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="p-2 rounded-lg hover:bg-indigo-50 transition-colors duration-300 relative"
            >
              <Bell size={20} className="text-indigo-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <AnimatePresence>
              {isNotificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-100 py-2 overflow-hidden"
                >
                  <div className="px-4 py-2 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                  </div>
                  <div className="p-4 text-center text-gray-500 text-sm">
                    Aucune notification pour le moment
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-x-3 p-2 rounded-lg hover:bg-indigo-50 transition-colors duration-300"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center shadow-md shadow-indigo-500/20">
                <User size={16} className="text-white" />
              </div>
              <span className="font-medium text-sm text-gray-700">{user?.userName}</span>
            </button>

            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 overflow-hidden"
                >
                  <Link
                    to="/dashboard/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Profile
                    </div>
                  </Link>
                  <button
                    onClick={handleLogout}
                    disabled={isLoading}
                    className="w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50 transition-colors duration-300 flex items-center gap-x-2"
                  >
                    <LogOut size={16} />
                    {isLoading ? 'Déconnexion...' : 'Se déconnecter'}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
