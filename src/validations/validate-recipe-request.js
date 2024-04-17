const Joi = require('joi');
const recipeSchema = Joi.object().keys({
  title: Joi.string().required(),
  user_id: Joi.string().required(),
  duration: Joi.string().required(),
  description: Joi.string().required(),
  instructions: Joi.string().required(),
  ingredients: Joi.array().items(Joi.string()).required(),
  category: Joi.string().valid('Breakfast', 'Lunch', 'Dinner').required(),
  image: Joi.string(),
});
function validateCreateRecipeRequest(reqBody) {
  const { error } = recipeSchema.validate(reqBody);
  return error;
}
module.exports = {
  validateCreateRecipeRequest
};
