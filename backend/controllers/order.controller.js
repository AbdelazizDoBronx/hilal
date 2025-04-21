import { 
    createOrderService, 
    getOrdersService,
    deleteOrderService
} from "../services/order.service.js";

export const createOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const { orderItems } = req.body;

        if (!orderItems || !orderItems.length) {
            return res.status(400).json({ message: "Order items are required" });
        }

        const orderId = await createOrderService(userId, orderItems);
        res.status(201).json({ 
            message: "Order created successfully", 
            orderId 
        });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ 
            message: "Failed to create order",
            error: error.message 
        });
    }
};

export const getOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const isAdmin = req.user.role === 'admin';
        const dateFilter = req.query.dateFilter; 
        const orders = await getOrdersService(userId, isAdmin, dateFilter);
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ 
            message: "Failed to fetch orders",
            error: error.message 
        });
    }
};

export const deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const deleted = await deleteOrderService(orderId);
        
        if (deleted) {
            res.status(200).json({ message: "Order deleted successfully" });
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ 
            message: "Failed to delete order",
            error: error.message 
        });
    }
};