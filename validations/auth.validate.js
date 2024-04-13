const Joi = require("joi");
const { default: mongoose } = require("mongoose");
const passwordExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

module.exports = {
  registerationSchema: Joi.object().keys({
    name: Joi.string().min(3).max(30).required().messages({
      "string.required": "Name is required",
    }),
    username: Joi.string().min(3).max(30).required().messages({
      "string.required": "username is required",
    }),
    password: Joi.string().required().regex(passwordExp).messages({
      "string.required": "password is required",
    }),
    branch: Joi.string().required().messages({
      "string.required": "store is required",
    }),
  }),
};
