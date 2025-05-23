import { motion } from 'framer-motion';
import { Home, Package, ShoppingCart, ClipboardList, ChevronLeft } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useLogoutMutation } from '../../features/auth/authSlice';
import Logo from '../ui/Logo';
import NavigationItem from '../ui/NavigationItem';
import UserProfileCard from '../ui/UserProfileCard';
import BackgroundParticles from '../ui/BackgroundParticles';

const menuItems = [
  { icon: Home, label: 'Dashboard', path: '/dashboard' },
  { icon: Package, label: 'Produits', path: '/dashboard/products' },
  { icon: ClipboardList, label: 'Commandes', path: '/dashboard/orders' },
];
const userMenuItems = [
  { icon: Home, label: 'Dashboard', path: '/dashboard' },
  { icon: Package, label: 'Produits', path: '/dashboard/products' },
  { icon: ShoppingCart, label: 'Mon Panier', path: '/dashboard/cart' },
  { icon: ClipboardList, label: 'Mes Commandes', path: '/dashboard/orders' },
];

export default function Sidebar({ isOpen, toggleSidebar }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [logout, { isLoading }] = useLogoutMutation();
  const user = useSelector((state) => state.user.userInfo);
  const items = user?.role === 'admin' ? menuItems : userMenuItems;

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <motion.aside
      initial={{ width: isOpen ? 280 : 0, opacity: isOpen ? 1 : 0 }}
      animate={{ width: isOpen ? 280 : 0, opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white border-r border-gray-100 h-screen fixed top-0 left-0 z-40 overflow-hidden shadow-lg shadow-indigo-100/20"
    >
      <div className="h-full flex flex-col relative">
        <BackgroundParticles />

        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="p-6 border-b border-gray-100 flex items-center justify-between relative z-10"
        >
          <div
            onClick={() => navigate('/dashboard')}
            className="group">
            <Logo variant="full_logo" size="md" className="h-8 relative transition-transform duration-300 group-hover:scale-105" />
          </div>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-indigo-50 transition-colors duration-200"
          >
            <ChevronLeft size={20} className="text-indigo-600" />
          </button>
        </motion.div>

        <nav className="flex-1 overflow-y-auto p-4 relative z-10">
          <motion.ul
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
              hidden: {}
            }}
            className="space-y-2"
          >
            {items.map((item) => (
              <motion.li
                key={item.path}
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: { y: 0, opacity: 1, transition: { duration: 0.4 } }
                }}
              >
                <NavigationItem
                  key={item.path}
                  icon={item.icon}
                  label={item.label}
                  path={item.path}
                  isActive={location.pathname === item.path}
                  onClick={() => navigate(item.path)}
                />
              </motion.li>
            ))}
          </motion.ul>
        </nav>

        <div className="border-t border-gray-100 p-4 mt-auto relative z-10">
          <UserProfileCard
            user={user}
            onLogout={handleLogout}
            isLoading={isLoading}
          />
        </div>
      </div>
    </motion.aside>
  );
}

