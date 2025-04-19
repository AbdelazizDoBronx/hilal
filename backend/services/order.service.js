import { query } from "../config/db.js";

export const createOrderService = async (userId, orderItems) => {
    try {
        // Start transaction
        await query('BEGIN');

        // Calculate total amount
        const totalAmount = orderItems.reduce((sum, item) => 
            sum + (item.quantity * item.price), 0);

        // Create order header
        const orderResult = await query(
            'INSERT INTO orders (user_id, total_amount) VALUES ($1, $2) RETURNING order_id',
            [userId, totalAmount]
        );
        const orderId = orderResult.rows[0].order_id;

        // Insert order items
        for (const item of orderItems) {
            await query(
                `INSERT INTO order_items 
                (order_id, product_id, quantity_sold, unit_price, subtotal)
                VALUES ($1, $2, $3, $4, $5)`,
                [orderId, item.product_id, item.quantity, item.price, 
                 item.quantity * item.price]
            );

            // Update product quantity
            await query(
                'UPDATE products SET quantity = quantity - $1 WHERE id = $2',
                [item.quantity, item.product_id]
            );
        }

        await query('COMMIT');
        return orderId;
    } catch (error) {
        await query('ROLLBACK');
        throw error;
    }
};

export const getOrdersService = async (userId, isAdmin, dateFilter) => {
    let dateCondition = '';
    const queryParams = isAdmin ? [] : [userId];

    // Add date filtering
    if (dateFilter) {
        switch (dateFilter) {
            case 'today':
                dateCondition = 'AND DATE(o.created_at) = CURRENT_DATE';
                break;
            case 'week':
                dateCondition = 'AND DATE(o.created_at) >= CURRENT_DATE - INTERVAL \'7 days\'';
                break;
            case 'month':
                dateCondition = 'AND DATE(o.created_at) >= CURRENT_DATE - INTERVAL \'1 month\'';
                break;
            case 'year':
                dateCondition = 'AND DATE(o.created_at) >= CURRENT_DATE - INTERVAL \'1 year\'';
                break;
        }
    }

    const queryText = `
        SELECT 
            o.order_id,
            o.total_amount,
            o.created_at,
            u.username,
            json_agg(json_build_object(
                'product_name', p.name,
                'quantity_sold', oi.quantity_sold,
                'unit_price', oi.unit_price,
                'subtotal', oi.subtotal
            )) as items
        FROM orders o
        JOIN users u ON o.user_id = u.id
        JOIN order_items oi ON o.order_id = oi.order_id
        JOIN products p ON oi.product_id = p.id
        ${isAdmin ? '' : 'WHERE o.user_id = $1'}
        ${dateCondition}
        GROUP BY o.order_id, u.username
        ORDER BY o.created_at DESC
    `;

    const { rows } = await query(queryText, queryParams);
    return rows;
};

