const router = require("express").Router();

const path = require("path");

router.get("/app", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../public/pages/app.html"));
});

router.get("/login", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../public/pages/login.html"));
});

router.get("/signup", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../public/pages/signup.html"));
});

module.exports = router;
