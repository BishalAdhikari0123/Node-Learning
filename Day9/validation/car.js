import Joi from 'joi'

const addCarSchema = Joi.object().keys({
    name: Joi.string().min(3).required(),
    manufacturer: Joi.string().min(3).required(),
    price: Joi.number().min(0).required(),
    makeYear: Joi.date().required(),
}

);

export {addCarSchema}