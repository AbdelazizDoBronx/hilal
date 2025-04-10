import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle } from 'lucide-react';

const Form = ({ 
  children, 
  onSubmit, 
  status = { type: '', message: '' },
  className = '' 
}) => {
  return (
    <form onSubmit={onSubmit} className={`space-y-6 ${className}`}>
      {status.message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${
            status.type === 'success' 
              ? 'bg-emerald-50 border-emerald-400 text-emerald-700' 
              : 'bg-red-50 border-red-400 text-red-700'
          } border-l-4 p-4 rounded-lg shadow-sm backdrop-blur-sm`}
        >
          <div className="flex items-center">
            {status.type === 'success' ? (
              <CheckCircle className="h-5 w-5 text-emerald-400" />
            ) : (
              <AlertCircle className="h-5 w-5 text-red-400" />
            )}
            <p className="ml-3 text-sm font-medium">{status.message}</p>
          </div>
        </motion.div>
      )}
      {children}
    </form>
  );
};

export default Form;