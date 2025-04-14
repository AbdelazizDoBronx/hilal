import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProductsSearch = ({ searchTerm, onSearchChange, filters, onFilterChange  }) => {
  const [showFilters, setShowFilters] = useState(false);


  const handleFilterChange = (newFilters) => {
    onFilterChange(newFilters);
    setShowFilters(false);
  };

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
        <div className="relative">
          <motion.button 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center py-2.5 px-4 border border-gray-200 bg-white rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-sm font-medium text-gray-700"
          >
            <Filter size={18} className="mr-2 text-indigo-500" />
            Filtrer
          </motion.button>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 p-4 z-50"
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Trier par</label>
                    <select
                      value={filters.sortBy}
                      onChange={(e) => handleFilterChange({ ...filters, sortBy: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2"
                    >
                      <option value="name">Nom</option>
                      <option value="price">Prix</option>
                      <option value="quantity">Quantité</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ordre</label>
                    <select
                      value={filters.order}
                      onChange={(e) => handleFilterChange({ ...filters, order: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2"
                    >
                      <option value="asc">Croissant</option>
                      <option value="desc">Décroissant</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                    <select
                      value={filters.stock}
                      onChange={(e) => handleFilterChange({ ...filters, stock: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2"
                    >
                      <option value="all">Tous</option>
                      <option value="inStock">En stock</option>
                      <option value="lowStock">Stock faible</option>
                      <option value="outOfStock">Rupture de stock</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ProductsSearch;