const express = require("express");
const profileResult = require("./routes/profileResult");
const upload = require("./routes/upload");
const download = require("./routes/download");

const app = express();

app.use("/profile", profileResult);

app.use("/upload", upload);

app.use("/download", download);

app.listen(4000, () => {
  console.log("server is listening on port 4000");
});
