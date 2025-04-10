import { Package, PlusCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const ProductsLoading = () => (
  <div className="min-h-64 flex items-center justify-center">
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-indigo-600 rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-500 font-medium">Chargement...</p>
    </div>
  </div>
);

export const ProductsEmpty = ({ searchTerm, onAddClick }) => (
  <div className="min-h-64 flex items-center justify-center">
    <div className="flex flex-col items-center text-center p-6">
      <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
        <Package size={28} className="text-indigo-500" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-1">Aucun produit trouvé</h3>
      <p className="text-gray-500 max-w-sm mb-4">
        {searchTerm 
          ? "Aucun produit ne correspond à votre recherche."
          : "Vous n'avez pas encore ajouté de produits."}
      </p>
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={onAddClick}
        className="flex items-center py-2 px-4 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-all duration-300 font-medium"
      >
        <PlusCircle size={16} className="mr-2" />
        Ajouter un produit
      </motion.button>
    </div>
  </div>
);