import { Package, PlusCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductsHeader = ({ onAddClick, showAddButton }) => {
  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex justify-between items-center mb-6"
    >
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center shadow-md shadow-indigo-500/20 mr-3">
          <Package size={20} className="text-white" />
        </div>
        <h1 className="text-2xl font-display font-semibold text-gray-900">Produits</h1>
      </div>
      {showAddButton && (
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onAddClick}
          className="flex items-center py-2 px-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-md shadow-indigo-600/20 font-medium"
        >
          <PlusCircle size={18} className="mr-2" />
          Ajouter un produit
        </motion.button>
      )}
    </motion.div>
  );
};

export default ProductsHeader;