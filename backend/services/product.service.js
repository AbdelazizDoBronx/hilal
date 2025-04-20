import { query } from "../config/db.js"


export const getAllProductsService = async () => {
    const {rows} = await query('SELECT * FROM PRODUCTS');
    return rows;
}


export const isProductNameExist = async (productName) => {
    const {rowCount} = await query(
        'SELECT id FROM PRODUCTS WHERE LOWER(name) = LOWER($1)',
        [productName]
    );
    return rowCount > 0;
}

export const findProductById = async (productId) => {
    const {rowCount} = await query('SELECT id FROM PRODUCTS WHERE id=$1',[productId]);
    return rowCount>0
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
        // First delete related cart items
        await query('DELETE FROM cart_items WHERE product_id=$1', [productId]);
        
        // Then delete the product
        const {rowCount} = await query('DELETE FROM PRODUCTS WHERE id=$1', [productId]);
        return rowCount > 0;
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
}
