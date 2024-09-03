const jwt = require('jsonwebtoken')
const userModel = require('../models/user-model')

module.exports = async function(req,res,next){
    if(!req.cookies.token){
        // name of flash            msg of flash
        req.flash("error",' Please login, you need to login first')
        return res.redirect('/')
    }

    try{
        const decodeUser = jwt.verify(req.cookies.token, process.env.JWT_KEY);

        const user = await userModel.findOne({email: decodeUser.email}).select("-password");

        req.user = user;
        next();

    }catch(err){
        req.flash("error","something went wrong")
        res.redirect('/')
    }
}