import { Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductsSearch = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="p-4 border-b border-gray-100">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400" size={18} />
          <input
            type="text"
            className="w-full bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300"
            placeholder="Rechercher des produits..."
            value={searchTerm}
            onChange={onSearchChange}
          />
        </div>
        <motion.button 
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center py-2.5 px-4 border border-gray-200 bg-white rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-sm font-medium text-gray-700"
        >
          <Filter size={18} className="mr-2 text-indigo-500" />
          Filtrer
        </motion.button>
      </div>
    </div>
  );
};

export default ProductsSearch;