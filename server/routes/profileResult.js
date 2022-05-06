const express = require("express");
const path = require("path");
const { findProfile } = require("../myMongoose");

const router = express.Router();
router.use(express.json());

router.post("/", (req, res) => {
  console.log(req.body);
  async function wrapperFunc() {
    try {
      const foundProfile = await findProfile(req.body);
      console.log(foundProfile);
      res.json(foundProfile);
    } catch (error) {
      console.log(error);
    }
  }
  wrapperFunc();
});

router.get("/uploads/:picName", (req, res) => {
  const picName = req.params.picName;
  console.log(picName);
  const pathName = path.join(__dirname, "..", "uploads", picName);
  res.sendFile(pathName);
});

module.exports = router;
