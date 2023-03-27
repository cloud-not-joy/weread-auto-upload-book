const puppeteer = require("puppeteer");

const initPage = async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto("https://weread.qq.com/#login");
  return page;
};

const closePage = async (page) => {
  await page.close();
};

const getLoginQrcode = async (page) => {
  await page.click(".navBar_link_Login");
  const imgSrc = await page.$eval(".login_dialog_qrcode img", (el) => el.src);
  // navBar_link_Login
  console.log(imgSrc);
  return imgSrc;
  // Set screen size
};

const getUserAvatar = async (page) => {
  const avatarSrc = await page.$eval(".navBar_avatar img", (el) => el.src);
  return avatarSrc;
};

const goUploadFilePage = async (page) => {
  await page.goto("https://weread.qq.com/web/upload");
  // await page.click(".navBar_link_Upload");
  // await page.waitForSelector(".bookUpload_fileSelectPanel");
};

const uploadFile = async (page, filePaths) => {
  // file input class bookUpload_fileSelectPanel_file
  await page.waitForSelector(".bookUpload_fileSelectPanel_file", {
    visible: false,
    hidden: true,
  });
  const input = await page.$(".bookUpload_fileSelectPanel_file");
  if (!input) {
    return false;
  }
  await input.uploadFile(filePaths);
  await page.waitForSelector(".bookUpload_progressBar_Success");
  return true;
};

(async () => {
  // await browser.close();
})();

module.exports = {
  getLoginQrcode,
  closePage,
  initPage,
  getUserAvatar,
  goUploadFilePage,
  uploadFile,
};
