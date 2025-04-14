import { motion } from 'framer-motion';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CartEmpty = () => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-100/80 text-center"
  >
    <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4">
      <ShoppingCart size={32} className="text-indigo-600" />
    </div>
    <h2 className="text-xl font-medium text-gray-900 mb-2">Votre panier est vide</h2>
    <p className="text-gray-600 mb-6">Ajoutez des produits pour commencer vos achats</p>
    <Link 
      to="/dashboard/products" 
      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-md shadow-indigo-500/20 font-medium"
    >
      Parcourir les produits
      <ArrowRight size={16} className="ml-2" />
    </Link>
  </motion.div>
);

export default CartEmpty;