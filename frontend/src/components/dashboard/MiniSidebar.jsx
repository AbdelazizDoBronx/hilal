import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import { Home, Package, ShoppingCart, ClipboardList } from 'lucide-react';

const menuItems = [
  { icon: Home, label: 'Dashboard', path: '/dashboard' },
  { icon: Package, label: 'Produits', path: '/dashboard/products' },
  { icon: ClipboardList, label: 'Commandes', path: '/dashboard/orders' },
];

const userMenuItems = [
  { icon: Home, label: 'Dashboard', path: '/dashboard' },
  { icon: Package, label: 'Produits', path: '/dashboard/products' },
  { icon: ShoppingCart, label: 'Mon Panier', path: '/dashboard/cart' },
  { icon: ClipboardList, label: 'Commandes', path: '/dashboard/orders' },
];

const MiniSidebar = ({ isVisible, role }) => {
  const location = useLocation();

  // Filter out "Mon Panier" for admin role
  const items = role === 'admin' 
    ? menuItems 
    : userMenuItems.filter(item => item.label !== 'Mon Panier');

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="fixed left-0 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-r-xl shadow-lg border border-gray-100/80 z-20"
        >
          <div className="flex flex-col gap-3">
            {items.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <motion.div
                  key={item.path}
                  whileHover={{ scale: 1.1, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    to={item.path}
                    className="relative group"
                    title={item.label}
                  >
                    <div className={`p-2 rounded-lg transition-all duration-300 ${
                      isActive
                        ? 'bg-indigo-600 text-white'
                        : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-600'
                    }`}>
                      <Icon size={20} />
                    </div>

                    {/* Tooltip */}
                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap">
                      {item.label}
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MiniSidebar;

