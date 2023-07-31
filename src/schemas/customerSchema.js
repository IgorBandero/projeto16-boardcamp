import Joi from "joi";

export const customerSchema = Joi.object({
    name: Joi.string().min(1).required(),
    phone: Joi.string().pattern(/^\d+$/).min(10).max(11),
    cpf: Joi.string().pattern(/^\d+$/).length(11),
    birthday: Joi.date().format(['YYYY-MM-DD'])
});