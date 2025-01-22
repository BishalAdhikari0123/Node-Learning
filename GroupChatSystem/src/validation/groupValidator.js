import Joi from "joi";

const groupValidation = {
  validateCreateGroup: Joi.object({
    name: Joi.string().required(),
    description: Joi.string().optional(), 
    isPrivate: Joi.boolean().optional(), 
  }),
};

export default groupValidation;
