import { query } from "../config/db.js"

 


export const getAllOrdersService = async () => {
    const {rows} = await query('SELECT * FROM ORDERS');
    return rows;
}


export const isProductIdExist = async (productId) => {
    const {rowCount} = await query('SELECT id FROM PRODUCTS WHERE id=$1',[productId]);
    return rowCount>0;
}


export const insertNewOrderService = async (orderDetails) => {
    const {productId, quantitySold, revenue} = orderDetails;
    const {rows} = await query('INSERT INTO ORDERS(productId,quantitySold,revenue) VALUES($1,$2,$3) RETURNING *',[productId,quantitySold,revenue]);
    return rows[0];
}




