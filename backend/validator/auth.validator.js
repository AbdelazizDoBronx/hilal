import Joi from "joi";


const validator = (schema) => (payload) =>
    schema.validate(payload,{abortEarly:false}) 


const registerSchema = Joi.object({
    userName:Joi.string().min(3).max(50).required(),
    userEmail:Joi.string().email().required(),
    userPassword:Joi.string().min(8).max(50).required()
})

export const loginSchema = Joi.object({
    userEmail:Joi.string().email().required(),
    userPassword:Joi.string().min(8).max(50).required()
})

export const registerSchemaValidator = validator(registerSchema)
export const loginSchemaValidator = validator(loginSchema)