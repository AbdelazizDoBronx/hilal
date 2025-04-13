import { Edit, Trash2, ShoppingCart, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductCard = ({ product, onEdit, onDelete, isAdmin }) => {
  // Convert price to number and handle potential invalid values
  const formatPrice = (price) => {
    const numPrice = Number(price);
    return isNaN(numPrice) ? '0.00' : numPrice.toFixed(2);
  };

  const isLowStock = Number(product.quantity) < 10;

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
    >
      {/* Top colorful band based on stock status */}
      <div className={`h-1.5 w-full ${
        isLowStock 
          ? 'bg-gradient-to-r from-red-500 to-orange-500' 
          : 'bg-gradient-to-r from-indigo-500 to-purple-500'
      }`}></div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-medium text-gray-900 line-clamp-1">{product.name}</h3>
        {isAdmin && (  
          <div className="flex space-x-1">
            <motion.button 
              whileHover={{ scale: 1.1, backgroundColor: '#EEF2FF' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onEdit(product)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-indigo-600 transition-colors"
            >
              <Edit size={16} />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.1, backgroundColor: '#FEF2F2' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onDelete(product.id)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 transition-colors"
            >
              <Trash2 size={16} />
            </motion.button>
          </div>
        )}
        </div>
        
        <div className="mb-4">
          <div className="text-sm text-gray-500 mb-1">Prix</div>
          <div className="text-xl font-bold text-gray-900">
            {formatPrice(product.price)} <span className="text-sm font-medium text-gray-500">MAD</span>
          </div>
        </div>
        
        <div className="flex justify-between items-end">
          <div>
            <div className="flex items-center mb-1">
              <div className="text-sm text-gray-500 mr-1">Stock</div>
              {isLowStock && <AlertCircle size={14} className="text-red-500" />}
            </div>
            <div className={`text-lg font-bold ${
              isLowStock ? 'text-red-600' : 'text-gray-900'
            }`}>
              {product.quantity}
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center py-2 px-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-md shadow-indigo-600/10 font-medium text-sm"
          >
            <ShoppingCart size={16} className="mr-2" />
            Ajouter
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;