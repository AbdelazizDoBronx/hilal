import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, User } from 'lucide-react';
import { useState } from 'react';
import Card  from '../ui/Card';
import  Button  from '../ui/Button';

const formatPrice = (price) => {
  const numPrice = Number(price);
  return isNaN(numPrice) ? '0.00' : numPrice.toFixed(2);
};

const CartItemList = ({ items, onUpdateQuantity, onRemoveItem }) => {
  const [editingQuantity, setEditingQuantity] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const handleQuantityClick = (item) => {
    setEditingQuantity(item.cart_item_id);
    setInputValue(item.quantity.toString());
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^[0-9\b]+$/.test(value)) {
      setInputValue(value);
    }
  };

  const handleInputBlur = (cartItemId) => {
    if (inputValue !== '' && inputValue !== '0') {
      onUpdateQuantity(cartItemId, parseInt(inputValue, 10));
    }
    setEditingQuantity(null);
  };

  const handleInputKeyDown = (e, cartItemId) => {
    if (e.key === 'Enter') handleInputBlur(cartItemId);
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
                
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <User size={14} className="mr-1" />
                  <span>Ajouté par: {item.added_by}</span>
                </div>

                <div className="flex items-center mt-3">
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    onClick={() => onUpdateQuantity(item.cart_item_id, Math.max(0, item.quantity - 1))}
                    icon={Minus}
                  />
                  
                  {editingQuantity === item.cart_item_id ? (
                    <input
                      type="text"
                      value={inputValue}
                      onChange={handleInputChange}
                      onBlur={() => handleInputBlur(item.cart_item_id)}
                      onKeyDown={(e) => handleInputKeyDown(e, item.cart_item_id)}
                      className="w-12 mx-2 text-center border border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      autoFocus
                    />
                  ) : (
                    <span 
                      onClick={() => handleQuantityClick(item)}
                      className="mx-4 font-medium text-gray-900 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md"
                    >
                      {item.quantity}
                    </span>
                  )}

                  <Button 
                    variant="secondary" 
                    size="sm" 
                    onClick={() => onUpdateQuantity(item.cart_item_id, item.quantity + 1)} 
                    icon={Plus}
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