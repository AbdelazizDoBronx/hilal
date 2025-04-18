import { deleteProductService, findProductById, getAllProductsService, insertProductService, isProductNameExist, updateProductService } from "../services/product.service.js";
import { productInfoValidator } from "../validator/product.validator.js";


export const getAllProducts = async (req,res) => {

    try {
        const allProducts = await getAllProductsService();
        if(allProducts){
            res.status(200).json(allProducts);
        }else{
            res.status(400).json({message: "no products found!"})
        }
    } catch (error) {
        console.log('server error',error);
        res.status(500).json({
            message: "internal server error!",
            error
        })
    }
}



export const insertNewProduct = async (req,res) => {

    try {
        const errors = {};
        const {error,value:validatedProduct} = productInfoValidator(req.body);

        if (error) {
            error.details.forEach(err => {
                errors[err.path[0]] = err.message;
            });
            return res.status(400).json({ errors });
        }

        // check if product name already exist
        const nameExist = await isProductNameExist(validatedProduct.name);
        if(nameExist){
            return res.status(400).json({message: "product already exists!"})
        }

        const createdProduct = await insertProductService(validatedProduct);
        if(!createdProduct){
            res.status(400).json({message: "invalid Product info!"})
        }else{
            res.status(200).json({message: "prodcut created successfully!"})
        }

    } catch (error) {
        console.log('error inserting product',error);
        res.status(500).json(
            {
                message: 'internal server error!',
                error
            }
        )
    }
}

export const updateProduct = async (req,res) => {

    // { "ID": 1, "Name": "Lait", "Price": 10.5, "Quantity": 20 }, 
    // validate data
    // handdle errors
    // update new record
    try {   
        const {id} = req.params;
        const errors = {};
        const {error,value:validatedProduct} = productInfoValidator(req.body);
        
        if (error) {
            error.details.forEach(err => {
                errors[err.path[0]] = err.message;
            });
            return res.status(400).json({ errors });
        }

        const updatedProduct = await updateProductService(validatedProduct,id);
        if(updatedProduct){
            res.status(200).json({message: "product updated successfuly!"})
        }else{
            res.status(400).json({message: "invalid product data"})
        }
    } catch (error) {
        res.status(500).json({
            message: "internal server error",
            error
        })
    }
}


export const deleteProduct = async (req,res) => {
    try {
        const {id} = req.params;
        const isProductExist = await findProductById(id);
        
        if(!isProductExist){
            return res.status(404).json({message: "Product doesn't exist!"});
        }

        const deletedProduct = await deleteProductService(id);
        if(deletedProduct){
            return res.status(200).json({message: "Product deleted successfully!"});
        } else {
            return res.status(400).json({message: "Failed to delete product"});
        }
    } catch (error) {
        console.error('Error deleting product:', error);
        return res.status(500).json({
            message: "Failed to delete product",
            error: error.message
        });
    }
}