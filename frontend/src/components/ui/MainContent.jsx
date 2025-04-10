import { motion } from 'framer-motion';
import BackgroundParticles from './BackgroundParticles';

const MainContent = ({ children, className = '' }) => {
  return (
    <div className="p-6 relative">
      <BackgroundParticles />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto relative z-10"
      >
        <div className={`bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-100/80 ${className}`}>
          {children}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 text-center text-sm text-neutral-500"
      >
        <span className="inline-block px-4 py-2 bg-white/50 rounded-full backdrop-blur-sm">
          © 2025 AlHilal Distribution • Tous droits réservés
        </span>
      </motion.div>
    </div>
  );
};

export default MainContent;