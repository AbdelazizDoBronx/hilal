import { motion } from 'framer-motion';
import { Package, ChevronDown, ChevronUp, Calendar } from 'lucide-react';
import { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';

const OrderCard = ({ order }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const itemsVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { 
      height: 'auto', 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5 }}
    >
      <Card gradient={false} animate={false} className="p-5 hover:shadow-2xl transition-all duration-300">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-50 rounded-full shadow-sm">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-slate-800">
                  Commande #{order.order_id}
                </h3>
                <div className="flex items-center space-x-2 mt-1">
                  <Calendar size={14} className="text-slate-400" />
                  <p className="text-sm text-slate-500">
                    {formatDate(order.created_at)}
                  </p>
                </div>
              </div>
            </div>
            <div className="text-right flex flex-col items-end">
              <p className="font-semibold text-lg text-blue-600">
                {Number(order.total_amount).toFixed(2)} MAD
              </p>
              <p className="text-sm text-slate-500 mt-1">
                Par {order.username}
              </p>
            </div>
          </div>

          {/* Items List */}
          <motion.div
            variants={itemsVariants}
            initial="hidden"
            animate={isExpanded ? "visible" : "hidden"}
            className="overflow-hidden"
          >
            <div className="space-y-3 py-2">
              {order.items.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex justify-between items-center bg-slate-50 p-4 rounded-lg border border-slate-100"
                >
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-white rounded-md mr-3 flex items-center justify-center border border-slate-200">
                      <Package size={20} className="text-slate-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-800">{item.product_name}</h4>
                      <p className="text-sm text-slate-500">
                        {item.quantity_sold} × {Number(item.unit_price).toFixed(2)} MAD
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold text-blue-600">
                    {Number(item.subtotal).toFixed(2)} MAD
                  </p>
                </motion.div>
              ))}
              
              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="flex justify-between font-semibold text-slate-800">
                  <span>Total</span>
                  <span>{Number(order.total_amount).toFixed(2)} MAD</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Footer */}
          <div className="pt-2 border-t border-slate-100">
            <Button
              variant="ghost"
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full flex items-center justify-center"
              icon={isExpanded ? ChevronUp : ChevronDown}
            >
              {isExpanded ? 'Masquer les détails' : 'Voir les détails'}
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default OrderCard;