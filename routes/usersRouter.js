const express = require("express");
const router = express.Router();
const { registerUser, loginUser, logoutUser } = require('../controllers/authController') // comes from controller/authControler

router.get("/", function (req, res) {
  res.send("hey user");
});

router.post("/register", registerUser); // -> authController/

router.post("/login", loginUser); // -> controller/authController/

router.get("/logout", logoutUser)

module.exports = router;
