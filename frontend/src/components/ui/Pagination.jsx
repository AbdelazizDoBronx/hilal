import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="mt-8 flex justify-center">
      <div className="flex items-center gap-3 p-1.5 bg-white/50 backdrop-blur-sm rounded-2xl">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`
            w-10 h-10 flex items-center justify-center rounded-xl
            transition-colors duration-200
            ${currentPage === 1 
              ? 'text-gray-400 cursor-not-allowed' 
              : 'hover:bg-white/80 text-gray-700'}
          `}
        >
          <ChevronLeft size={20} />
        </motion.button>

        <div className="w-14 h-10 flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium">
          {currentPage}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`
            w-10 h-10 flex items-center justify-center rounded-xl
            transition-colors duration-200
            ${currentPage === totalPages 
              ? 'text-gray-400 cursor-not-allowed' 
              : 'hover:bg-white/80 text-gray-700'}
          `}
        >
          <ChevronRight size={20} />
        </motion.button>
      </div>
    </div>
  );
};

export default Pagination;