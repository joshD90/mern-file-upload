const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("download endpoint hit whats your problem");
});

module.exports = router;
