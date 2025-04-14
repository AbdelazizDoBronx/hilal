import { motion } from 'framer-motion';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  isLoading = false,
  ...props
}) => {
  const variants = {
    primary: 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500',
    secondary: 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50',
    danger: 'bg-red-50 text-red-600 hover:bg-red-100',
  };

  const sizes = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-2.5 px-4',
    lg: 'py-3.5 px-6',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        flex items-center justify-center rounded-xl font-medium
        transition-all duration-300 shadow-sm
        disabled:opacity-70 disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Chargement...
        </span>
      ) : (
        <span className="flex items-center">
          {Icon && <Icon size={18} className={children ? 'mr-2' : ''} />}
          {children}
        </span>
      )}
    </motion.button>
  );
};

export default Button;