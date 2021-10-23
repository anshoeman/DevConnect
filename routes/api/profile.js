const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const request = require('request');
const { check, validationResult } = require("express-validator");
const GITHUB_CLIENT_ID = "032b86ca5196b9ec622c"
const GITHUB_CLIENT_SECRET = "bca3972cd56a5fe7a655e97699119db978843a25"
//@route api/profile/me
//@desc GET the profile of the current user
//@access we want the user id which is in the token hence it is private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );
    // A concept to Think about
    // 1.we get access to user from auth ie from the decided user
    // 2.I want to populate the user avatar and name in profile
    // for that lets use .populate() method
    if (!profile) res.status(400).json({ msg: "No Profile Found" });

    res.json(profile);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

//@desc Create and Update a user profile
//@route api/profile

//In the validator array we need to check the required feilds
//So in Profile model we have the skills and status as the required feilds
router.post(
  "/",
  [
    auth,
    [
      check("status", "Status is required").not().isEmpty(),
      check("skills", "Skills are required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors });
    }
    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;
    //Check if the above feilds were added in the input box
    //Let's check the above thing by building the profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;

    //actually skill is a list initially hence so we will have to trim it and also remove the commas
    //as in the frontend we dont want to show the skills as with the commas hence we need to use
    //some purejavascript function

    //We Used Here the split function that converts a normal string list into array
    //and hence we have the
    //1. split removes the things we want to remove the commas
    //2. trim removes the white spaces from starting and ending
    if (skills) {
      profileFields.skills = skills.split(",").map((skill) => skill.trim());
    }

    //Build Profile Object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (instagram) profileFields.social.instagram = instagram;
    if (linkedin) profileFields.social.linkedin = linkedin;

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      //This is if the profile is found we will update and send it back to the user
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }
      //If Profile not found
      profile = new Profile(profileFields);
      await profile.save();
      res.send(profile);
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "Server Error" });
    }
  }
);

//@desc GET all profiles
//@route /api/profile
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
});
//@desc GET a specific profile
//@route /api/profile/user/user_id
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]); 
    if (!profile) {
      return res.status(400).json({ msg: "Profile Not Found" });
    }
    res.json(profile);
  } catch (err) {
    console.log(err);
    if (err.kind == "ObjectId")
      return res.status(400).json({ msg: "Profile Not Found" });
  }
});

//@desc DELETE all profiles user and posts
//@route /api/profile
router.delete("/", auth, async (req, res) => {
  try {
    //Remove the profile
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: "User Deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
});

//@desc Adding the experince and education feild
//@route PUT request to /api/profile/experince
//@access Private
router.put(
  "/experience",
  [
    auth,
    [
      check("title", "title is required").not().isEmpty(),
      check("company", "company is required").not().isEmpty(),
      check("from", "from is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }
    const { title, company, location, from, to, current, description } =
      req.body;
    //Create the object with the data user submits
    const newexp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(newexp); //Unshift is just like push but that just pushes the element in the begininng of the array
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.log(err); 
      res.status(500).send("Server Error");
    }
  }
);
//@route DELETE /api/profile/experience/:exp_id
//desc DELETE profile experience
//@access PRIVATE
router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    //Get Remove index
    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id); 
    profile.experience.splice(removeIndex, 1);    
 
    await profile.save(); 
    res.json(profile);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error" });
  }
});
/*>>>>>>>>*/
router.put(
  "/education",
  [
    auth,
    [
      check("school", "school is required").not().isEmpty(),
      check("degree", "degree is required").not().isEmpty(),
      check("fieldofstudy", "feild of study is required").not().isEmpty(),
      check("from","from date is required").not().isEmpty()
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }
    const { school, degree, fieldofstudy, from, to, current, description } =
      req.body;
    //Create the object with the data user submits
    const newedu = {
      school, 
      degree, 
      fieldofstudy,
      from,
      to,
      current,
      description,
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(newedu); //Unshift is just like push but that just pushes the element in the begininng of the array
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.log(err); 
      res.status(500).send("Server Error");
    }
  }
);
//@route DELETE /api/profile/experience/:edu_id
//desc DELETE profile experience
//@access PRIVATE
router.delete("/education/:edu_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    //Get Remove index
    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.edu_id); 
    profile.education.splice(removeIndex, 1);    
 
    await profile.save(); 
    res.json(profile);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error" });
  }
});

//@desc GET request
//@route GET api/profile/github/:username
router.get('/github/:username',(req,res)=>{
  try{
      const options = {
        uri:`https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}`,
        method:'GET',
        headers:{'user-agent':'node.js'}
      }
  request(options,(error,response,body)=>{
    if(error) console.log(error)
    if(response.statusCode !== 200){
      res.status(404).json({msg:'No Github Profile Found'})
    }
    res.json(JSON.parse(body))
  })
  }catch(err){
    console.log(err);
    res.status(500).send('Server Error');
  }
})
module.exports = router;
