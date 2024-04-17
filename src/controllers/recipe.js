/**
 * @description this api create recipe for user;
*/

const { getAllRecipeActions, createRecipeAction } = require("../services/recipe-services");
const { validateCreateRecipeRequest } = require("../validations/validate-recipe-request");
const errorFunction = require("../common/error-function");
const {
    ReasonPhrases,
    StatusCodes
} = require('http-status-codes');

/**
 * Create Recipe
 * @param req: Request | any
 * @param res: Response
 */
exports.createRecipe = async(req,res, next) =>{
    try {
        console.log('req.body', req.body);
        if(!req.body){
            return res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
        } 
        req.body.user_id = req.user.id;
        const validatorError = await validateCreateRecipeRequest(req.body);
        if (validatorError) {
            return res.status(StatusCodes.BAD_REQUEST).send(errorFunction(true, `Error in creating Data : ${validatorError.message}`));
        }
        console.log("req.body", req.body);
        const data = await createRecipeAction(req.body);
        return res
            .status(StatusCodes.CREATED)
            .json(Object.assign(data));
        
    } catch (error) {
        next(error);
    }
}

/**
 * Get All Recipes
 * @param req: Request | any
 * @param res: Response
 */
exports.getAllRecipe = async(req,res, next) =>{
    try {
        const data = await getAllRecipeActions(req.body);
        return res
            .status(StatusCodes.CREATED)
            .json(Object.assign(data));
        
    } catch (error) {
        log(error);
        next(error);
    }
}