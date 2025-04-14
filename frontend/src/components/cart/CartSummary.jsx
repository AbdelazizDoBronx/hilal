import { motion } from 'framer-motion';
import { CreditCard, Trash2 } from 'lucide-react';

const CartSummary = ({ items, onClearCart }) => {
  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const tva = subtotal * 0.2;
  const total = subtotal + tva;

  const handleCheckout = () => {
    // checkout logic here

  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-100/80"
    >
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Résumé de la commande
      </h3>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-gray-600">
          <span>Sous-total</span>
          <span className="font-medium">{subtotal.toFixed(2)} MAD</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>TVA (20%)</span>
          <span className="font-medium">{tva.toFixed(2)} MAD</span>
        </div>
        <div className="border-t border-gray-100 pt-3">
          <div className="flex justify-between font-bold text-gray-900">
            <span>Total</span>
            <span>{total.toFixed(2)} MAD</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleCheckout}
          className="w-full flex items-center justify-center py-2.5 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-md shadow-indigo-500/20 font-medium"
        >
          <CreditCard size={18} className="mr-2" />
          Procéder au paiement
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onClearCart}
          className="w-full flex items-center justify-center py-2.5 px-4 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-300 font-medium"
        >
          <Trash2 size={18} className="mr-2" />
          Vider le panier
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CartSummary;