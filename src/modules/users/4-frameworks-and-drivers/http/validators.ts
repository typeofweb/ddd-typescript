import * as Joi from "typesafe-joi";

export const postUserValidator = Joi.object({
  body: Joi.object({
    email: Joi.string().required()
  }).required()
})
  .unknown(true)
  .required();
