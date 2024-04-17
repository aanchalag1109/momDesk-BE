const errorFunction = require("../common/error-function");
const { loginUserAction, registerUserAction } = require("../services/user-services");
const { validateLoginRequest } = require("../validations/validate-login-request");
const { validateRegisterRequest } = require("../validations/validate-register-request");
const {
    ReasonPhrases,
    StatusCodes
} = require('http-status-codes');
/**
	 * @function loginUser
	 * @description Login user API
	 * @param mobileNumber
	 * @author 
*/
exports.loginUser = async(req, res, next) =>{
    try {
        console.log("req", req.body);
        const validatorError = await validateLoginRequest(req.body);
        if (validatorError) {
            return res.status(StatusCodes.BAD_REQUEST).send(errorFunction(true, `Error in creating Data : ${validatorError.message}`));
        }
        const data = await loginUserAction(req.body);
        return res
            .status(StatusCodes.ACCEPTED)
            .json(Object.assign(data));
        
    } catch (error) {
        next(error);
    }
}

/**
	 * @function register user
	 * @description Register user API
	 * @param email, password, fullName
	 * @author 
*/
exports.registerUser = async(req, res, next) =>{
    try {
        if(!req.body){
            return res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
        } 
        const validatorError = await validateRegisterRequest(req.body);
        if (validatorError) {
            return res.status(StatusCodes.BAD_REQUEST).send(errorFunction(true, `Error in creating Data : ${validatorError.message}`));
        }
        const data = await registerUserAction(req.body);
        return res
            .status(StatusCodes.ACCEPTED)
            .json(Object.assign(data));
        
    } catch (error) {
        next(error);
    }
}