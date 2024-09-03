const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/product-model");

router.post("/create", upload.single("image"), async function (req, res) {
  try{
    let { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;

  const product = await productModel.create({
      name,
      price,
      discount,
      bgcolor,
      panelcolor,
      textcolor,
      image: req.file.buffer, // image come from req.file with bufferData
  });

  req.flash("success","Product created successfully")
  res.redirect("/owners/admin")

  }catch(err){
    res.send(err.message)
  }
});

module.exports = router;
