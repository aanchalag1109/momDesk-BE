const recipeModel = require("../models/recipeModel");

exports.createRecipeAction = async(req) =>{
    let reqBody = req.body;
    if (req.fileValidationError) {
        return {
            status: false,
            message: req.fileValidationError
        }
    }
    if (req.file) {
        reqBody.image = `${process.env.APP_BASE_URL}/recipes/${req.file.filename}`
    }
    const createData = await recipeModel.create(req.body);
    if(createData){
        return {
            message: "Your Recipe has been created successfully",
            status: true,
        };
    }
}

exports.getAllRecipeActions = async(reqBody) =>{
    let reqPayload = {};
    const data = await recipeModel.find(reqPayload);
    return data
}