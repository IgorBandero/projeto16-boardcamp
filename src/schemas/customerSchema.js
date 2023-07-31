import joi from "joi";

export const customerSchema = joi.object({
    name: joi.string().min(1).required(),
    phone: joi.string().pattern(/^\d+$/).min(10).max(11),
    cpf: joi.string().pattern(/^\d+$/).length(11),
    birthday: joi.date().iso().raw()
});