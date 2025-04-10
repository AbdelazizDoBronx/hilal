import { motion } from 'framer-motion';

const GlassCard = ({ 
  children, 
  className = '', 
  isDark = false,
  hover = false 
}) => {
  const baseClasses = `
    backdrop-blur-md rounded-3xl border shadow-xl
    ${isDark 
      ? 'bg-white/10 border-white/20 shadow-black/5' 
      : 'bg-white/80 border-neutral-100/80'}
    ${hover ? 'hover:shadow-2xl hover:bg-white/15 transition-all duration-300' : ''}
    ${className}
  `;

  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={baseClasses}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;