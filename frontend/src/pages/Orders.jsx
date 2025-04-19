import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGetOrdersQuery } from '../features/orders/orderSlice';
import OrderCard from '../components/orders/OrderCard';
import OrdersFilter from '../components/orders/OrdersFilter';
import { ShoppingBag, FileText } from 'lucide-react';
import BackgroundParticles from '../components/ui/BackgroundParticles';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import Pagination from '../components/ui/Pagination';

const Orders = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [dateFilter, setDateFilter] = useState('');
    const { data: orders = [], isLoading } = useGetOrdersQuery(dateFilter);

    const paginatedOrders = orders.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const headerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    useEffect(() => {
        const pageCount = Math.ceil(orders.length / itemsPerPage);
        
        if (currentPage > pageCount && pageCount > 0) {
            setCurrentPage(pageCount);
        }
    }, [orders.length, currentPage, itemsPerPage]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full"
                />
            </div>
        );
    }

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <BackgroundParticles />

            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="container mx-auto px-4 py-8 relative z-10"
            >
                <motion.div
                    variants={headerVariants}
                    className="flex items-center justify-between mb-8"
                >
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-blue-100 rounded-full shadow-sm">
                            <ShoppingBag className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-800">Mes Commandes</h1>
                            <p className="text-slate-500">
                                {orders.length} commande{orders.length !== 1 ? 's' : ''} total
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center justify-end">
                        <OrdersFilter dateFilter={dateFilter} onFilterChange={setDateFilter} />
                    </div>
                </motion.div>

                {orders.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <GlassCard className="p-8 text-center">
                            <FileText className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                            <h2 className="text-xl font-semibold mb-2 text-slate-700">
                                Aucune commande trouvée
                            </h2>
                            <p className="text-slate-500 mb-6">
                                Vos commandes apparaîtront ici une fois que vous aurez effectué un achat.
                            </p>
                            <Button variant="primary">
                                Commencer les achats
                            </Button>
                        </GlassCard>
                    </motion.div>
                ) : (
                    <AnimatePresence>
                        <motion.div
                            className="space-y-6"
                            variants={containerVariants}
                        >
                            {paginatedOrders.map((order) => (
                                <OrderCard
                                    key={order.order_id}
                                    order={order}
                                />
                            ))}
                            <Pagination
                                currentPage={currentPage}
                                totalItems={orders.length}
                                itemsPerPage={itemsPerPage}
                                onPageChange={setCurrentPage}
                            />
                        </motion.div>
                    </AnimatePresence>
                )}
            </motion.div>
        </div>
    );
};

export default Orders;

