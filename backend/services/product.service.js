import { query } from "../config/db.js"


export const getAllProductsService = async () => {
    const {rows} = await query('SELECT * FROM products WHERE is_deleted = FALSE');
    return rows;
}


export const findProductById = async (productId) => {
    const {rowCount} = await query(
        'SELECT id FROM products WHERE id = $1 AND is_deleted = FALSE',
        [productId]
    );
    return rowCount > 0;
}

export const isProductNameExist = async (productName) => {
    const {rowCount} = await query(
        'SELECT id FROM products WHERE LOWER(name) = LOWER($1) AND is_deleted = FALSE',
        [productName]
    );
    return rowCount > 0;
}

export const insertProductService = async (productDetails) => {
    const {name,price,quantity} = productDetails;
    const {rows} = await query('INSERT INTO PRODUCTS(name,price,quantity) VALUES($1,$2,$3) RETURNING *',[name,price,quantity]);
    return rows[0];
}

export const updateProductService = async (productDetails, productId) => {
    const { name, price, quantity } = productDetails;
    
    // Check if the new name exists for any other product (case insensitive)
    const { rows } = await query(
        'SELECT id FROM products WHERE LOWER(name) = LOWER($1) AND id != $2',
        [name, productId]
    );
    
    // If name exists for another product, return null
    if (rows.length > 0) {
        return null;
    }
    
    // If name doesn't exist, proceed with update
    const result = await query(
        'UPDATE products SET name=$1, price=$2, quantity=$3 where id=$4 RETURNING *',
        [name, price, quantity, productId]
    );
    return result.rows[0];
};


export const deleteProductService = async (productId) => {
    try {
        // Start a transaction
        await query('BEGIN');

        // Remove from cart_items (active carts)
        await query('DELETE FROM cart_items WHERE product_id = $1', [productId]);

        // Soft delete the product by setting is_deleted to true
        const result = await query(
            'UPDATE products SET is_deleted = TRUE WHERE id = $1 RETURNING id',
            [productId]
        );

        await query('COMMIT');
        return result.rows.length > 0;

    } catch (error) {
        await query('ROLLBACK');
        console.error('Error in deleteProductService:', error);
        throw error;
    }
};