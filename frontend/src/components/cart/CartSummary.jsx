import { motion } from 'framer-motion';
import { CreditCard, ShoppingBag,AlertCircle  } from 'lucide-react';
import { useClearCartMutation } from '../../features/cart/cartSlice';
import { useCreateOrderMutation } from '../../features/orders/orderSlice';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const CartSummary = ({ items }) => {
  const [clearCart] = useClearCartMutation();
  const [createOrder] = useCreateOrderMutation();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const hasInsufficientStock = items.some(item => item.quantity > item.stock_quantity);

  const calculateTotal = () => {
    // Only include items with sufficient stock
    return items
      .filter(item => item.quantity <= item.stock_quantity)
      .reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = async () => {
    try {
      setIsProcessing(true);

      const orderItems = items.map(item => ({
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price
      }));

      await createOrder({ orderItems }).unwrap();
      await clearCart().unwrap();

      toast.success('Commande validée avec succès!');
      navigate('/dashboard/orders');
    } catch (error) {
      console.error('Checkout failed:', error);
      toast.error('Échec de la commande. Veuillez réessayer.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-xl overflow-hidden shadow-lg"
    >
      <div className="p-6">
        <motion.div
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          className="flex items-center gap-2 mb-6"
        >
          <ShoppingBag className="text-indigo-600" size={24} />
          <h2 className="text-xl font-semibold text-gray-900">
            Résumé de la commande
          </h2>
        </motion.div>

        {hasInsufficientStock && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm flex items-center gap-2"
          >
            <AlertCircle size={16} />
            <span>Certains articles ont un stock insuffisant</span>
          </motion.div>
        )}

        <div className="space-y-4">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex justify-between items-center ${item.quantity > item.stock_quantity ? 'opacity-50' : ''
                }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-gray-600">{item.quantity}x</span>
                <span className="text-gray-800">{item.name}</span>
              </div>
              <span className="font-medium text-gray-900">
                {(item.price * item.quantity).toFixed(2)} MAD
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 pt-6 border-t border-gray-100"
        >
          <div className="flex justify-between items-center mb-6">
            <span className="text-gray-600">Total</span>
            <motion.span
              key={calculateTotal()}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="text-xl font-bold text-gray-900"
            >
              {calculateTotal().toFixed(2)} MAD
            </motion.span>
          </div>

          <motion.button
            whileHover={!hasInsufficientStock && !isProcessing ? { scale: 1.02 } : {}}
            whileTap={!hasInsufficientStock && !isProcessing ? { scale: 0.98 } : {}}
            disabled={isProcessing || hasInsufficientStock || items.length === 0}
            onClick={handleCheckout}
            className={`
            w-full py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2
            ${isProcessing || hasInsufficientStock || items.length === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-300'
              }
          `}
          >
            {isProcessing ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Traitement...</span>
              </>
            ) : (
              <>
                <CreditCard size={18} />
                <span>Commander</span>
              </>
            )}
          </motion.button>

          {(hasInsufficientStock || items.length === 0) && (
            <p className="text-sm text-gray-500 text-center mt-3">
              {items.length === 0
                ? "Votre panier est vide"
                : "Veuillez ajuster les quantités en stock avant de commander"}
            </p>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};
export default CartSummary;