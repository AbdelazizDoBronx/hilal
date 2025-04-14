import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '', 
  animate = true, 
  delay = 0,
  gradient = false 
}) => {
  const baseClasses = `
    bg-white/80 backdrop-blur-sm rounded-2xl
    border border-gray-100/80 shadow-xl
    ${gradient ? 'bg-gradient-to-r from-white/90 to-white/70' : ''}
    ${className}
  `;

  return animate ? (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay }}
      className={baseClasses}
    >
      {children}
    </motion.div>
  ) : (
    <div className={baseClasses}>{children}</div>
  );
};

export default Card;