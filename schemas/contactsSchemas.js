import Joi from "joi";

export const createContactSchema = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().min(2).required(),
      email: Joi.string().email(),
      phone: Joi.string(),
      favorite: Joi.boolean(),
    })
    .validate(data);

export const updateContactSchema = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string(),
      email: Joi.string().email(),
      phone: Joi.string(),
      favorite: Joi.boolean(),
    })
    .validate(data);
