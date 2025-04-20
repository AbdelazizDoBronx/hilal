import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation
} from '../features/products/productSlice';
import { ProductLayout, ProductGrid, ProductActions } from '../components/products';
import { useProductFilters } from '../hooks/useProductFilters';
import usePagination from '../hooks/usePagination';
import { toast } from 'react-toastify';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filters, setFilters] = useState({
    sortBy: '',
    order: 'asc',
    stock: 'all'
  });

  // Redux hooks
  const { data: products = [], isLoading } = useGetProductsQuery();
  const [addProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  
  // User info from Redux store
  const user = useSelector((state) => state.user.userInfo);
  const isAdmin = user?.role === 'admin';

  const { filteredProducts } = useProductFilters(products, searchTerm, filters);
  const {
    currentPage,
    paginatedItems: paginatedProducts,
    setCurrentPage
  } = usePagination(filteredProducts, 9);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

const handleSubmit = async (productData) => {
  try {
    if (selectedProduct) {
      // Updating existing product
      const result = await updateProduct({
        id: selectedProduct.id,
        ...productData
      }).unwrap();
      
      if (result) {
        toast.success('Product updated successfully');
        setShowForm(false);
        setSelectedProduct(null);
      }
    } else {
      // Adding new product
      await addProduct(productData).unwrap();
      toast.success('Product added successfully');
      setShowForm(false);
    }
  } catch (error) {
    console.error('Operation failed:', error);
    toast.error(
      error.data?.message || 
      'Failed to update product. Please try again.'
    );
  }
};
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId).unwrap();
      toast.success('Product deleted successfully');
    } catch (error) {
      toast.error(error.data?.message || 'An error occurred');
    }
  };

  return (
    <ProductLayout
      isAdmin={isAdmin}
      searchTerm={searchTerm}
      filters={filters}
      onSearch={handleSearch}
      onFilter={handleFilterChange}
      onAddClick={() => {
        setSelectedProduct(null);
        setShowForm(true);
      }}
    >
      <ProductGrid
        products={paginatedProducts}
        isLoading={isLoading}
        isAdmin={isAdmin}
        currentPage={currentPage}
        totalItems={filteredProducts.length}
        onPageChange={setCurrentPage}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <ProductActions
        showForm={showForm}
        selectedProduct={selectedProduct}
        isAdmin={isAdmin}
        onClose={() => {
          setShowForm(false);
          setSelectedProduct(null);
        }}
        onSubmit={handleSubmit}
      />
    </ProductLayout>
  );
};

export default Products;