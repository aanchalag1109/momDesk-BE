const Joi = require('joi');
const loginSchema = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required()
});
function validateLoginRequest(reqBody) {
  const { error } = loginSchema.validate(reqBody);
  return error;
}
module.exports = {
    validateLoginRequest
};
