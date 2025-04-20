import { useState, useMemo, useEffect } from 'react';

const usePagination = (items = [], itemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Recalculate currentPage if items length changes and current page is out of bounds 
  useEffect(() => {
    const pageCount = Math.ceil(items.length / itemsPerPage);
    if (currentPage > pageCount && pageCount > 0) {
      setCurrentPage(pageCount);
    }
  }, [items.length, currentPage, itemsPerPage]);

  // Get paginated items
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  }, [items, currentPage, itemsPerPage]);

  return {
    currentPage,
    paginatedItems,
    setCurrentPage,
    totalItems: items.length
  };
};

export default usePagination;