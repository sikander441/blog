const auth = require("../../middleware/auth");
const bcrypt = require("bcrypt");
const userModel = require('../models/user')
const express = require("express");
const router = express.Router();


router.get('/login',async (req,res) =>{

})
router.get("/current", auth, async (req, res) => {
   
    const user = await userModel.findById(req.user._id).select("-password");
    res.send(user);
  });

router.post("/register", async (req, res) => {
    console.log(req.body.email)
    console.log(req.body.name)
    console.log(req.body.password)
    let user = await userModel.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already registered.");
  
    user = new userModel({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email
    });
    user.password = await bcrypt.hash(user.password, 10);
    await user.save();
  
    const token = user.generateAuthToken();
    res.header("x-auth-token", token).send({
      _id: user._id,
      name: user.name,
      email: user.email
    });
  });
  

  module.exports = router;