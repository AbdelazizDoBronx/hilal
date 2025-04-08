import Joi from "joi"

const validator = (schema) => (payload) =>
    schema.validate(payload,{abortEarly:false})


const OrderSchema = Joi.object({
    productId: Joi.number().required(),
    quantitySold: Joi.number().min(1).required(),
    revenue: Joi.number().required()
})

export const orderInfoValidator = validator(OrderSchema);