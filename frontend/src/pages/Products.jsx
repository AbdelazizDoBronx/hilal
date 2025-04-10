import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGetProductsQuery, useAddProductMutation, useUpdateProductMutation, useDeleteProductMutation } from '../features/products/productSlice';
import ProductCard from '../components/products/ProductCard';
import ProductForm from '../components/products/ProductForm';
import ProductsHeader from '../components/products/ProductsHeader';
import ProductsSearch from '../components/products/ProductsSearch';
import { ProductsLoading, ProductsEmpty } from '../components/products/ProductsEmptyState';
import BackgroundParticles from '../components/ui/BackgroundParticles';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { data: products = [], isLoading } = useGetProductsQuery();
  const [addProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const handleAddProduct = async (productData) => {
    try {
      await addProduct(productData).unwrap();
      setShowForm(false);
    } catch (error) {
      console.error('Failed to add product:', error);
    }
  };

  const handleUpdateProduct = async (productData) => {
    try {
      await updateProduct({ id: productData.id, ...productData }).unwrap();
      setShowForm(false);
      setSelectedProduct(null);
    } catch (error) {
      console.error('Failed to update product:', error);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      try {
        await deleteProduct(id).unwrap();
      } catch (error) {
        console.error('Failed to delete product:', error);
      }
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative">
      <BackgroundParticles />

      <div className="relative z-10">
        <ProductsHeader 
          onAddClick={() => {
            setSelectedProduct(null);
            setShowForm(true);
          }} 
        />

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100/80 mb-6 overflow-hidden"
        >
          <ProductsSearch 
            searchTerm={searchTerm}
            onSearchChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="p-6">
            {isLoading ? (
              <ProductsLoading />
            ) : filteredProducts.length === 0 ? (
              <ProductsEmpty 
                searchTerm={searchTerm}
                onAddClick={() => {
                  setSelectedProduct(null);
                  setShowForm(true);
                }}
              />
            ) : (
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.05 } },
                  hidden: {}
                }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    variants={{
                      hidden: { y: 20, opacity: 0 },
                      visible: { y: 0, opacity: 1, transition: { duration: 0.4 } }
                    }}
                  >
                    <ProductCard
                      product={product}
                      onEdit={(product) => {
                        setSelectedProduct(product);
                        setShowForm(true);
                      }}
                      onDelete={handleDeleteProduct}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showForm && (
          <ProductForm
            product={selectedProduct}
            onSubmit={selectedProduct ? handleUpdateProduct : handleAddProduct}
            onClose={() => {
              setShowForm(false);
              setSelectedProduct(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Products;