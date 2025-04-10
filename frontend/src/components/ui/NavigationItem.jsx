import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';

const NavigationItem = ({ icon: Icon, label, path, isActive }) => {
  return (
    <motion.div
      initial={false}
      animate={{
        backgroundColor: isActive ? 'rgb(99, 102, 241)' : 'transparent',
        color: isActive ? 'white' : '#4B5563'
      }}
      transition={{ duration: 0.3 }}
      className={`relative w-full rounded-xl ${isActive ? 'overflow-hidden' : ''}`}
    >
      <NavLink
        to={path}
        className="flex items-center gap-x-3 px-4 py-3 rounded-xl transition-all duration-300"
      >
        <Icon size={20} />
        <span className="font-medium">{label}</span>
      </NavLink>
      {isActive && (
        <motion.div
          layoutId="activeBackground"
          className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
};

export default NavigationItem;