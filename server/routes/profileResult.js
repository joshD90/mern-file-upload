//request all standard modules
const express = require("express");
const path = require("path");
//require out own mongo functions
const { findProfile, updateProfile } = require("../myMongoose");
//require lightweight file uploading
const fileUpload = require("express-fileupload");

//set up router
const router = express.Router();
//set up our middleware
router.use(express.json());
router.use(fileUpload());

//this is the endpoint hit by the FindProfile page in react
router.post("/", (req, res) => {
  //check is the request valid otherwise submits an undefined search
  //into our mongo search, returning every profile
  if (req.body.fName || req.body.sName || req.body.email) {
    wrapperFunc();
  } else {
    res.send("This is not a valid search option");
  }
  //put into async wrapper function so that we can await the mongo server
  async function wrapperFunc() {
    try {
      const foundProfile = await findProfile(req.body);
      res.json(foundProfile);
    } catch (error) {
      console.log(error);
    }
  }
});
//after the react module gets the database response, the img will hit this endpoint
//to request the image
router.get("/uploads/:picName", (req, res) => {
  const picName = req.params.picName;
  console.log(picName);
  //concatonate the pathname using path module - needs to go into the parent folder ergo the ".."
  const pathName = path.join(__dirname, "..", "uploads", picName);
  res.sendFile(pathName);
});

//when we go to the update page this end point is hit so that the response can
//prefill the form
router.get("/update/:id", (req, res) => {
  //put into wrapper function so that it can be called asynconously so that there is
  //time to hit the mongo database
  async function wrapperFunc() {
    try {
      const foundProfile = await findProfile({ _id: req.params.id });
      res.json(foundProfile);
    } catch (error) {
      console.log(error);
    }
  }
  wrapperFunc();
});
//this is the endpoint which recieves the updated profile data
router.post("/update", (req, res) => {
  async function wrapperFunc() {
    try {
      const id = req.body.id;
      //grab the profile data from the form data object and place it all as
      //one object.  Pic path is grabbed at this point as well in case there is
      //no file to upload in which case it will remain the same
      let profileData = {
        fName: req.body.firstNameInput,
        sName: req.body.secondNameInput,
        email: req.body.emailInput,
        picPath: req.body.picPath,
      };
      //we need to wrap the if statement and the file upload into a function so that it
      //can be called asyncronously.  If there is a file, it will upload the file and return
      //the pic path of where that file was uploaded.  Only once this has been done will the
      //mongoose update function be called.
      async function ifWrapper() {
        if (req.files !== null) {
          const file = req.files.file;

          const newFilePath = path.join(__dirname, "..", "uploads", file.name);
          //file.mv is effectively file . move, first param is where to send it to
          //this uploader package does all the piping for us
          file.mv(newFilePath, (err) => {
            //second param takes a callback.  I suppose that it might be possible to place the
            //uploading of the file path into the callback function of this to handle the asyncronous
            //nature of the request
            if (err) {
              console.error(err);
              return res.status(500);
            }
          });
          //only functions that return a promise will be handled asyncronously
          return new Promise((resolve, reject) => {
            if (newFilePath) {
              //return newFilePath variable upon successful completion of the function
              resolve(newFilePath);
            } else {
              //if something went wrong it will return the reject response
              reject(console.log("something bad happened"));
            }
          });
        }
      }
      //we can now call the wrapper function for the fileupload and it will return the new file
      //path
      profileData.picPath = await ifWrapper();
      //now that the whole object is complete, we can now update it in our database
      updateProfile(id, profileData);
      res.send("A new Profile has been set up");
    } catch (error) {
      console.log(error);
    }
  }
  wrapperFunc();
});

module.exports = router;
