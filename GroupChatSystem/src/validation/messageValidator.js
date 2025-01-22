import Joi from 'joi';

const messageValidator = Joi.object({
  groupId: Joi.string().required().regex(/^[a-f\d]{24}$/i),
  senderId: Joi.string().required().regex(/^[a-f\d]{24}$/i),
  content: Joi.string().trim().required(),
  file: Joi.string().uri().optional(),
  
  timestamp: Joi.date().optional(),

  isDeleted: Joi.boolean().optional(),
});

export const validateMessage = (messageData) => {
  const { error, value } = messageValidator.validate(messageData, {
    abortEarly: false, 
    allowUnknown: true, 
  });

  if (error) {
    throw new Error(
      `Validation error: ${error.details.map((detail) => detail.message).join(', ')}`
    );
  }

  return value;
};
