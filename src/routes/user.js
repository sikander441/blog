const auth = require("../../middleware/auth");
const bcrypt = require("bcrypt");
const userModel = require('../models/user')
const express = require("express");
const router = express.Router();



router.get('/login',async (req,res) =>{
  let email = req.query.email;
  let password = req.query.password
  if(!email || !password) return res.status(400).send("Provide info")
  let user = await userModel.findOne({ email: req.query.email });
  if (!user) return res.status(400).send("No Such user found");
  if(bcrypt.compareSync(password, user.password))
  {
    const token = user.generateAuthToken();
      let options = {
        maxAge: 1000 * 60 * 300, // would expire after 300 minutes
        httpOnly: true, // The cookie only accessible by the web server
    }
    res.cookie('token',token,options).redirect('/blog/admin/')
  }
  else
   res.status(400).send('failed')

})
router.get("/current", auth, async (req, res) => {
   
    const user = await userModel.findById(req.user._id).select("-password");
    res.send(user);
  });

  module.exports = router;