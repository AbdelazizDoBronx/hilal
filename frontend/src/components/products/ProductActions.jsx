import { AnimatePresence } from 'framer-motion';
import ProductForm from './ProductForm';

const ProductActions = ({ 
  showForm, 
  selectedProduct, 
  isAdmin, 
  onClose,
  onSubmit
}) => {
  if (!isAdmin) return null;

  return (
    <AnimatePresence>
      {showForm && (
        <ProductForm
          product={selectedProduct}
          onClose={onClose}
          onSubmit={onSubmit}
        />
      )}
    </AnimatePresence>
  );
};

export default ProductActions;

