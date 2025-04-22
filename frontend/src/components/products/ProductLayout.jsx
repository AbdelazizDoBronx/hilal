import ProductsHeader from './ProductsHeader';
import ProductsSearch from './ProductsSearch';
import BackgroundParticles from '../ui/BackgroundParticles';

const ProductLayout = ({ 
  children, 
  isAdmin, 
  searchTerm, 
  filters, 
  onSearch, 
  onFilter, 
  onAddClick 
}) => {
  return (
    <div className="relative">
      <BackgroundParticles />
      
      <div className="relative z-10">
        <ProductsHeader
          onAddClick={onAddClick}
          showAddButton={isAdmin}
        />
        
        <ProductsSearch
          searchTerm={searchTerm}
          onSearchChange={onSearch}
          filters={filters}
          onFilterChange={onFilter}
        />
        
        {children}
      </div>
    </div>
  );
};

export default ProductLayout;
