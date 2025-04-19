import { motion } from 'framer-motion';

const OrdersFilter = ({ dateFilter, onFilterChange }) => {
  const filters = [
    { value: 'today', label: 'Aujourd\'hui' },
    { value: 'week', label: 'Cette semaine' },
    { value: 'month', label: 'Ce mois' },
    { value: 'year', label: 'Cette année' },
    { value: '', label: 'Tout afficher' },
  ];

  return (
    <div className="flex gap-1">
      {filters.map((filter) => (
        <motion.button
          key={filter.value}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onFilterChange(filter.value)}
          className={`py-1 px-2 rounded-full text-xs font-medium
            ${dateFilter === filter.value 
              ? 'bg-indigo-500 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
        >
          {filter.label}
        </motion.button>
      ))}
    </div>
  );
};

export default OrdersFilter;
