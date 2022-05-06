//this route deals with all the '/upload' endpoints

//require all our client side modules
const express = require("express");
const fileUpload = require("express-fileupload"); //file-upload is a lightweight express technology
const path = require("path");
const { createProfile } = require("../myMongoose");
//set up our router so that we can more efficiently manage our routes
const router = express.Router();
//set up the middleware for express.router()
router.use(fileUpload());
router.use(express.json());

//set up our posting endpoint for when we upload our file
router.post("/", (req, res) => {
  const profileData = {
    firstName: req.body.userName,
    secondName: req.body.secondName,
    email: req.body.email,
    picPath: "",
  };

  if (req.files === null) {
    //do a quick check to see whether there was a file attached to our form data
    return res.status(400).json({ msg: "No file uploaded" });
  }

  const file = req.files.file;
  //this is the filepath that we're going to upload our file to.
  //need to do this with path as we need to include __dirname
  const newFilePath = path.join(__dirname, "..", "uploads", file.name);
  //file.mv is effectively file . move, first param is where to send it to
  //this uploader package does all the piping for us
  file.mv(newFilePath, (err) => {
    //second param takes a callback
    if (err) {
      console.error(err);
      return res.status(500);
    }
    //just send back the package data
    profileData.picPath = newFilePath;
    createProfile(profileData);
    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});

//this is just a dummy endpoint set up to see was axios working?
router.get("/", (req, res) => {
  console.log("get route has been hit");
  res.send("you have hit the get /uploads/blue end point");
});

module.exports = router;
