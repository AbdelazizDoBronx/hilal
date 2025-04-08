import { getAllOrdersService, insertNewOrderService, isProductIdExist } from "../services/order.service.js";
import {orderInfoValidator} from '../validator/order.validator.js'

export const getAllOrders = async (req,res) => {

    try {
    const allOrders = await getAllOrdersService();
    if(allOrders){
        res.status(200).json(allOrders);
    }else{
        res.status(400).json({message: "no orders found"})
    }
    } catch (error) {
        res.status(500).json({
            message: "internal server error!",
            error
        })
    }
}

export const insertNewOrder = async (req,res) => {
    try {
        const errors = {};
        const {error,value:validatedOrder} = orderInfoValidator(req.body);

        if (error) {
            error.details.forEach(err => {
                errors[err.path[0]] = err.message;
            });
            return res.status(400).json({ errors });
        }

        // check if the product asigned to the order exist
        const isProductExist = await isProductIdExist(validatedOrder.productId);
        if(!isProductExist){
            return res.status(400).json({message: "Product dosen't exists"})
        }

        const insertedOrder = await insertNewOrderService(validatedOrder);
        if(insertedOrder){
            res.status(200).json({message: "order inserted successfully!"})
        }else{
            res.status(400).json({message: "couldn't insert order"})
        }
    } catch (error) {
        res.status(500).json({
            message: "internal server error",
            error
        })
    }
}