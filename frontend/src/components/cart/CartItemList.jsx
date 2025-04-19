import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { toast } from 'react-hot-toast';

const formatPrice = (price) => {
  const numPrice = Number(price);
  return isNaN(numPrice) ? '0.00' : numPrice.toFixed(2);
};

const CartItemList = ({ items, onUpdateQuantity, onRemoveItem }) => {
  const [editingQuantity, setEditingQuantity] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const handleQuantityChange = async (cartItemId, newQuantity, stockQuantity) => {
    if (newQuantity > stockQuantity) {
      toast.error('Stock insuffisant');
      return false;
    }
    await onUpdateQuantity(cartItemId, newQuantity);
    return true;
  };

  const handleInputBlur = async (cartItemId, stockQuantity) => {
    if (inputValue !== '' && inputValue !== '0') {
      const quantity = parseInt(inputValue, 10);
      const success = await handleQuantityChange(cartItemId, quantity, stockQuantity);
      if (!success) {
        setInputValue(stockQuantity.toString());
      }
    }
    setEditingQuantity(null);
  };

  return (
    <Card>
      <div className="px-6 py-4 border-b border-gray-100">
        <h3 className="text-lg font-medium text-gray-900">Articles du panier</h3>
      </div>

      <div className="divide-y divide-gray-100">
        <AnimatePresence>
          {items.map((item) => (
            <motion.div
              key={item.cart_item_id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className="p-6 flex items-center justify-between"
            >
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{item.name}</h4>
                <div className="text-sm text-gray-500 mt-1">
                  Prix unitaire: {formatPrice(item.price)} MAD
                </div>

                {/* Stock Status */}
                <div className="text-sm mt-1">
                  {item.quantity > item.stock_quantity && (
                    <div className="flex items-center text-red-500">
                      <AlertCircle size={14} className="mr-1" />
                      <span>Stock insuffisant (Disponible: {item.stock_quantity})</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center mt-3">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleQuantityChange(
                      item.cart_item_id,
                      Math.max(0, item.quantity - 1),
                      item.stock_quantity
                    )}
                    icon={Minus}
                    disabled={item.quantity > item.stock_quantity}
                  />

                  {editingQuantity === item.cart_item_id ? (
                    <input
                      type="number"
                      min="1"
                      max={item.stock_quantity}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onBlur={() => handleInputBlur(item.cart_item_id, item.stock_quantity)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.target.blur();
                        }
                      }}
                      className="w-16 text-center border border-gray-200 rounded-lg py-1 px-2"
                      autoFocus
                    />
                  ) : (
                    <span
                      className="w-16 text-center cursor-pointer hover:bg-gray-100 py-1 px-2 rounded-lg"
                      onClick={() => {
                        setEditingQuantity(item.cart_item_id);
                        setInputValue(item.quantity.toString());
                      }}
                    >
                      {item.quantity}
                    </span>
                  )}

                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleQuantityChange(
                      item.cart_item_id,
                      item.quantity + 1,
                      item.stock_quantity
                    )}
                    icon={Plus}
                    disabled={item.quantity >= item.stock_quantity}
                  />
                </div>
              </div>

              <div className="text-right">
                <div className="text-lg font-bold text-gray-900">
                  {formatPrice(item.price * item.quantity)} MAD
                </div>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => onRemoveItem(item.cart_item_id)}
                  icon={Trash2}
                  className="mt-2"
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Card>
  );
};

export default CartItemList;