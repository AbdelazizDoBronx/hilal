import { useMemo } from 'react';

export const useProductFilters = (products, searchTerm = '', filters = {}) => {
    const filteredProducts = useMemo(() => {
        return products
            .filter(product => {
                const search = searchTerm.toString().toLowerCase();
                // Text search filter
                const matchesSearch = product.name.toLowerCase().includes(search);
                // Stock filter
                let matchesStock = true;
                switch (filters.stock) {
                    case 'inStock':
                        matchesStock = product.quantity > 10;
                        break;
                    case 'lowStock':
                        matchesStock = product.quantity > 0 && product.quantity <= 10;
                        break;
                    case 'outOfStock':
                        matchesStock = product.quantity === 0;
                        break;
                    case 'all':
                    default:
                        matchesStock = true;
                }
                return matchesSearch && matchesStock;
            })
            .sort((a, b) => {
                if (filters.sortBy === 'name') {
                    return filters.order === 'asc'
                        ? a.name.localeCompare(b.name)
                        : b.name.localeCompare(a.name);
                }
                if (filters.sortBy === 'price') {
                    return filters.order === 'asc'
                        ? a.price - b.price
                        : b.price - a.price;
                }
                if (filters.sortBy === 'quantity') {
                    return filters.order === 'asc'
                        ? a.quantity - b.quantity
                        : b.quantity - a.quantity;
                }
                return 0;
            });
    }, [products, searchTerm, filters]);

    return { filteredProducts };
};
