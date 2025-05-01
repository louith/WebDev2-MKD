const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/register", authController.showRegisterForm);
router.post("/register", authController.register);

router.get("/login", authController.showLoginForm);
router.post("/login", authController.login);

router.get("/dashboard", authController.authenticate, authController.dashboard);

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
});

module.exports = router;
