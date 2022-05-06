const mongoose = require("mongoose");

const profileSchema = mongoose.Schema({
  fName: String,
  sName: String,
  email: String,
  picPath: String,
});

const Profile = new mongoose.model("Profile", profileSchema);

mongoose.connect("mongodb://localhost:27017/profPic");

async function createProfile(profileObj) {
  try {
    const profile = await new Profile({
      fName: profileObj.firstName,
      sName: profileObj.secondName,
      email: profileObj.email,
      picPath: profileObj.picPath,
    });
    profile.save();
    console.log("new entry has been create with id of " + profile._id);
  } catch (error) {
    console.log(error);
  }
}

async function findProfile(searchObj) {
  try {
    const result = await Profile.find(searchObj);
    return result;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { createProfile, findProfile };
