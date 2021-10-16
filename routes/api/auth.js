const express = require("express");
const router = express.Router();
const getAuth = require("../../middleware/auth");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const jwtsecret = "mysecrettoken";
const bcrypt = require("bcryptjs");
//@Desc : This will be the authentication to access the protected route
//@desc : Private
//@route : get The user info without the password
router.get("/", getAuth, async (req, res) => {
  //Once authorized we want to send back the user data;
  try {
    const user = await User.findById(req.user.id).select("-password"); //we want user data but we dont want to send the password
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

//Auth route

router.post(
  "/",
  [
    check("email", "Email is Required").isEmail(),
    check("password", "Password is Required").exists(), //returns a Boolean
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ err: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user)
        return res
          .status(400)
          .json({ errors: [{ msg: "User Doesnt Exists" }] });

      //Matching the password from database and the user that entred
      //The concept with this is as follows:
      //Bcrypt has something called compare(so we compare the password)
      //the compare function just compare the plain text password with the hashed one from the database
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(404).json({ msg: "Password incorrect" });
      }

      const payload = {
        user: {
          id: user.id, //With mongoose we can do .id rather than _id
        },
      };
      jwt.sign(
        payload,
        jwtsecret,
        {
          expiresIn: 3600,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
