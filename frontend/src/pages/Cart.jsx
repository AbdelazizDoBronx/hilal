import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import CartEmpty from '../components/cart/CartEmpty';
import CartItemList from '../components/cart/CartItemList';
import CartSummary from '../components/cart/CartSummary';
import { useGetCartQuery, useUpdateCartItemMutation, useRemoveFromCartMutation, useClearCartMutation } from '../features/cart/cartSlice';

const Cart = () => {
    const { data: cartItems = [], isLoading, error } = useGetCartQuery();  
    const [updateCartItem] = useUpdateCartItemMutation();
    const [removeFromCart] = useRemoveFromCartMutation();
    const [clearCart] = useClearCartMutation();

    const handleUpdateQuantity = async (cartItemId, quantity) => {
        try {
            if (quantity === 0) {
                await removeFromCart(cartItemId).unwrap();
            } else {
                await updateCartItem({
                    cartItemId: cartItemId,
                    quantity: quantity
                }).unwrap();
            }
        } catch (error) {
            console.error('Failed to update quantity:', error);
        }
    };

    const handleRemoveItem = async (cartItemId) => {
        try {
            await removeFromCart(cartItemId).unwrap();
        } catch (error) {
            console.error('Failed to remove item:', error);
        }
    };

    const handleClearCart = async () => {
        try {
            await clearCart().unwrap();
        } catch (error) {
            console.error('Failed to clear cart:', error);
        }
    };

    const sortedCartItems = [...cartItems].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

    return (
        <AnimatePresence>
            {isLoading ? (
                <div className="min-h-64 flex items-center justify-center">
                    <div className="flex flex-col items-center">
                        <div className="w-12 h-12 border-4 border-gray-200 border-t-indigo-600 rounded-full animate-spin"></div>
                        <p className="mt-4 text-gray-500 font-medium">Chargement du panier...</p>
                    </div>
                </div>
            ) : error ? (
                <div>Error loading cart</div>
            ) : !sortedCartItems.length ? (
                <CartEmpty />
            ) : (
                <div className="relative">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/4"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-full blur-2xl"></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="flex items-center mb-8"
                        >
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 mr-4">
                                <ShoppingCart size={24} className="text-white" />
                            </div>
                            <h1 className="text-2xl font-display font-semibold text-gray-900">
                                Mon Panier
                            </h1>
                        </motion.div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2">
                                <CartItemList
                                    items={sortedCartItems}
                                    onUpdateQuantity={handleUpdateQuantity}
                                    onRemoveItem={handleRemoveItem}
                                />
                            </div>
                            <div>
                                <CartSummary
                                    items={sortedCartItems}
                                    onClearCart={handleClearCart}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default Cart;

