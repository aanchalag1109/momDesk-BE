const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const userModel = require("../models/userModel");
/**
     * @function registerUserAction
     * @description Method to register
     * @param requestBody
     * @author 
*/
exports.registerUserAction = async (reqBody) => {
    try {
        const user = await userModel.findOne({ email: reqBody.email });
        if (user) {
            return {
                message: "This email is already registered",
                status: false,
            };
        }
        const hashedPassword = await bcrypt.hash(reqBody.password, 10);
        const newUser = new userModel({
            fullname: reqBody.fullname,
            email: reqBody.email,
            password: hashedPassword
        });
        await newUser.save();
        return {
            message: "User registered successfully",
            status: true,
        };
    } catch (error) {
        throw error;
    }
}

/**
     * @function 
     * @description Method to login
     * @param requestBody
     * @author 
*/
exports.loginUserAction = async (reqBody) => {
    try {
        const user = await userModel.findOne({ email: reqBody.email });
        if (!user) {
            return {
                message: "User not found",
                status: false,
            };
        }
        const validPassword = await bcrypt.compare(reqBody.password, user.password);
        if (!validPassword) {
            return {
                message: "Invalid password",
                status: false,
            };
        }
        const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET);
        return {
            message: "User logged in successfully",
            status: true,
            accessToken: accessToken
        };
    } catch (error) {
        throw error;
    }
}