const userModel = require("../models/user-model")
const productModel = require("../models/product-model")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require('../utils/generateToken') // -> utils/

module.exports.registerUser = async function (req, res) {
    try {
      let { fullname, email, password } = req.body;

      let user = await userModel.findOne({email: email})

      if(user){
        req.flash("error","User Exist already!")
        return res.redirect("/")
      }
  
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
          if (err) return res.send(err.message);
          else {
            let user = await userModel.create({
              fullname,
              email,
              password : hash,
            });
  
            let token = generateToken(user) // -> utils/
            res.cookie("token",token)
            req.flash("error","User created successfully")
            res.redirect("/")
          }
        });
      });
    } catch (err) {
      res.send(err.message);
    }
  }

module.exports.loginUser = async function(req, res){
  let {email, password} = req.body;

  let user = await userModel.findOne({email: email})

  if(!user){
    req.flash("error","Email not axist")
    return res.redirect("/");
  } 

  bcrypt.compare(password, user.password, async (err, result) => {
    if(result){
      let token = generateToken(user) // --> utils/generateToken
      res.cookie("token",token)
      let products = await productModel.find();
      res.render('shop',{products}) // render the views/shop
    }
    else{
      req.flash("error","Password not match")
      return res.redirect('/');
    }
  })
}

module.exports.logoutUser = function(req, res){
  res.cookie("token","")
  res.redirect("/")
}