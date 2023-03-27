const express = require("express");
const path = require("path");
const wereadPage = require("./getTitle.js");
const app = express();
const port = 3890;

let page = null;
(async () => {
  page = await wereadPage.initPage();
  console.log("page loaded");
})();

app.set("view engine", "pug");

app.get("/", async (req, res) => {
  const imgSrc = await wereadPage.getLoginQrcode(page);
  res.render("index", {
    title: "Hey",
    message: "Hello there!",
    image: imgSrc,
  });
  setTimeout(async () => {
    console.log(await wereadPage.getUserAvatar(page));
    await wereadPage.goUploadFilePage(page);
    const result = await wereadPage.uploadFile(
      page,
      path.resolve(__dirname, "movie.epub")
    );
    console.log("fileUpload result ", result);
  }, 10000);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
