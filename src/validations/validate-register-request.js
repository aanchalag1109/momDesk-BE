const Joi = require('joi');
const registerSchema = Joi.object().keys({
  email: Joi.string().required(),
  fullname: Joi.string().required(),
  password: Joi.string().required()
});
function validateRegisterRequest(reqBody) {
  const { error } = registerSchema.validate(reqBody);
  return error;
}
module.exports = {
    validateRegisterRequest
};
