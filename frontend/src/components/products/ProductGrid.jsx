import { motion } from 'framer-motion';
import  ProductCard  from './ProductCard';
import  Pagination  from '../ui/Pagination';
import { ProductsLoading, ProductsEmpty } from './ProductsEmptyState';

const ProductGrid = ({ 
  products, 
  isLoading, 
  isAdmin, 
  currentPage, 
  totalItems, 
  onPageChange, 
  onDelete, 
  onEdit 
}) => {
  if (isLoading) return <ProductsLoading />;
  if (products.length === 0) return <ProductsEmpty />;

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.05 } }
        }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isAdmin={isAdmin}
            onDelete={() => onDelete(product.id)}
            onEdit={() => onEdit(product)}
            onSubmit={(newProduct) => onSubmit(newProduct)}
          />
        ))}
      </motion.div>
      
      <Pagination
        currentPage={currentPage}
        totalItems={totalItems}
        itemsPerPage={9}
        onPageChange={onPageChange}
      />
    </>
  );
};

export default ProductGrid;
