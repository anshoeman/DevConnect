const jwt = require("jsonwebtoken");
const jwtsecret = "mysecrettoken";

//next is a middleware which helps when the piece of middleware is done
module.exports = function (req, res, next) {
  //Get token from header(extract)

  const token = req.header("x-auth-token");

  //Check the token

  if (!token)
    return res.status(401).json({ msg: "No token,Authorization denied" });

  //This return will terminate the code at
  //if statement only

  //Verify the Token
  try {
    //Decode the token
    const decoded = jwt.verify(token, jwtsecret); //Initially a secret will be given
    //During the authentication if the token has the same secret then the user will be authorized
    //Now the magic comes in ,we will attach the req.user with the decoded user we get
    req.user = decoded.user; //DECODED.USER that USER has the id of that user(as given in jwt.sign)
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
