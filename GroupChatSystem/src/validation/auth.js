import Joi from "joi";

const passwordValidation = Joi.string().min(8).required();
const emailValidation = Joi.string().email().required();

export default {
    login: {
        body: Joi.object().keys({
            email: emailValidation,
            password: passwordValidation,
        })
    },
    register: {
        body: Joi.object().keys({
            username: Joi.string().alphanum().min(3).max(10).required(),
            email: emailValidation,
            password: passwordValidation,
        })
    },
    verifyEmail: {
        params: Joi.object().keys({
            token: Joi.string().required(),
        })
    }
};
