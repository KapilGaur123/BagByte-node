const express = require('express')
const router = express.Router();
const isLoggedin = require("../middlewares/isLoggedIn")
const productModel = require("../models/product-model")
const userModel = require('../models/user-model')

router.get("/",function(req, res){
    let errorMsg = req.flash("error") || [];
    let successMsg = req.flash("success")

    res.render('index',{ success: successMsg, error: errorMsg, loggedin : false})
})

router.get("/shop", isLoggedin, async function(req, res){
    let products = await productModel.find();
    let success = req.flash("success")|| [];

    res.render("shop", {products, success})
})

router.get("/cart", isLoggedin, async function(req, res){
    
    res.render("cart")
})

router.get("/addtocart/:id", isLoggedin, async function(req, res){
    let user = await userModel.findOne({email: req.user.email})

    user.cart.push(req.params.id);
    await user.save();

    req.flash("success","Add to cart")
    res.redirect("/shop")
})

module.exports = router;