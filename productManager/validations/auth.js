
import Joi from "joi";

const passwordValidation = Joi.string().min(8).required();

export default {
    login: {
        body: Joi.object().keys({
            email: Joi.string().email().required(),
            password: passwordValidation,
        })
    },
    register: {
        body: Joi.object().keys({
            name: Joi.string().min(3).required(),
            address: Joi.string().min(3).required(),
            email: Joi.string().email().required(),
            phone: Joi.string().min(10).pattern(/^[0-9- \+]+$/).required(),
            password: passwordValidation,

        })
    }
}
