// import Joi from 'joi';

// const addCurrencySchema = Joi.object().keys({
//     date: Joi.date().required(),
//     source: Joi.string().min(3).required(),
//     updatedBy: Joi.string().min(4).required(),
//     currencies: Joi.array().items(Joi.object().keys({
//       name :Joi.string().min(3).max(20).required(),
//       exchangeRate: Joi.number().min(0).required(),
//       foundIn: Joi.date().min(1900).required(),
//   })).required()
// }).required()


// export {addCurrencySchema}
import Joi from 'joi';

// Validation schema for metadata (without currencies)
const metadataSchema = Joi.object({
  date: Joi.date().required(),
  source: Joi.string().min(3).required(),
  updatedBy: Joi.string().min(4).required(),
});

// Validation schema for a single currency
const singleCurrencySchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  exchangeRate: Joi.number().min(0).required(),
  foundIn: Joi.date().min('1900-01-01').required(),
});

// Validation schema for full metadata (including currencies)
const addCurrencySchema = Joi.object({
  date: Joi.date().required(),
  source: Joi.string().min(3).required(),
  updatedBy: Joi.string().min(4).required(),
  currencies: Joi.array().items(singleCurrencySchema).required(),
}).required();

export { addCurrencySchema, metadataSchema, singleCurrencySchema };

