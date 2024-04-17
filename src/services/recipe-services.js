const recipeModel = require("../models/recipeModel");

exports.createRecipeAction = async(reqBody) =>{
    console.log("reqBody", reqBody);
    const createData = await recipeModel.create(reqBody);
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