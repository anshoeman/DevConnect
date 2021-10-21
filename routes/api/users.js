const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const gravatar = require("gravatar");
const jwt = require('jsonwebtoken');
const jwtsecret = "mysecrettoken"

//@route POST api/users
//@desc Register User
//@access Public

router.post(
  "/",
  [
    check("name", "Name is Required").not().isEmpty(),
    check("email", "Email is Required").isEmail(),
    check("password", "Password should be of minimum length 6").isLength({
      min: 6, 
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, avatar, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user)
        res.status(400).json({ errors: [{ msg: "User already exists" }] });
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      user = new User({
        name,
        email,
        avatar,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt); 

      await user.save();//returns a promise
      //Implementing JSON web token(with react)
      //Lets prepare the payload
const payload = {
  user:{
    id:user.id //With mongoose we can do .id rather than _id
  }
}
jwt.sign(payload,jwtsecret,{
  expiresIn:3600
},(err,token)=>{
  if(err) throw err
  res.json({token})
})
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
