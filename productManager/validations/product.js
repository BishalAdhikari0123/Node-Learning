import Joi from 'joi';

const productValidation = {
  create: {
    body: Joi.object().keys({
      name: Joi.string().min(3).max(100).required(),
      cost: Joi.number().min(0).required(),
      stockQuantity: Joi.number().integer().min(0).required(),
      // createdBy: Joi.string().required(),
    }),
    // headers: Joi.object().keys({
    //   "x-user-id": Joi.string().required(),
    // }),
  },
};

export default productValidation;
