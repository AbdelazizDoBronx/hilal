import { query } from "../config/db.js"


export const getAllProductsService = async () => {
    const {rows} = await query('SELECT * FROM PRODUCTS');
    return rows;
}


export const isProductNameExist = async (prodcutName) => {
    const {rowCount} = await query('SELECT id FROM PRODUCTS WHERE name=$1',[prodcutName]);
    return rowCount > 0;
}

export const findProductById = async (prodcutId) => {
    const {rowCount} = await query('SELECT id FROM PRODUCTS WHERE id=$1',[prodcutId]);
    return rowCount>0
}

export const insertProductService = async (productDetails) => {
    const {name,price,quantity} = productDetails;
    const {rows} = await query('INSERT INTO PRODUCTS(name,price,quantity) VALUES($1,$2,$3) RETURNING *',[name,price,quantity]);
    return rows[0];
}

export const updateProductService = async (productDetails,prodcutId) => {
    const {name,price,quantity} = productDetails;
    const {rows} = await query('UPDATE PRODUCTS SET name=$1,price=$2,quantity=$3 where id=$4 RETURNING *',[name,price,quantity,prodcutId]);
    return rows[0];
}

export const deleteProductService = async (prodcutId) => {
    const {rowCount} = await query('DELETE FROM PRODUCTS WHERE id=$1',[prodcutId]);
    return rowCount>0
}   