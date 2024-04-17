const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const constant = require('../config/const_credentials');
const auth = async(req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, constant.SECRET_TOKEN);
        console.log("decoded", decoded, token);
        let data=await userModel.findOne(decoded);
        if(!data)
        {
            return res.status(401).json(Object.assign({ success: false }, {
                status: false,
                msg: 'User is blocked'
            }));    
        }
       
        if (!decoded) {
            throw new Error()
        }
        req.user = decoded;
        next();

    } catch (e) {
        token = {
            status: false,
            msg: 'Invalid Token'
        }
        return res.status(401).json(Object.assign({ success: false }, token));
    }
}
module.exports = auth;