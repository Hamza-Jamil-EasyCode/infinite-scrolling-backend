const Joi = require('joi');

const register = Joi.object({
  name: Joi.string().required().trim(),
  email: Joi.string().email().required().trim(),
  password: Joi.string().min(8).required().trim(),
});

const login = Joi.object({
  email: Joi.string().email().required().trim(),
  password: Joi.string().min(8).required().trim(),
});

const AdminValidateSchemas = { register, login };

export default AdminValidateSchemas;
