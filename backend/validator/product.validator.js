import Joi from 'joi'

const validator = (schema) => (payload) =>
    schema.validate(payload,{abortEarly:false})

// { "ID": 1, "Name": "Lait", "Price": 10.5, "Quantity": 20 }, 
const productSchema = Joi.object({
    name:Joi.string().required(),
    price:Joi.number().required(),
    quantity:Joi.number().integer().required(),
})


export const productInfoValidator = validator(productSchema);