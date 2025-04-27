const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");

router.get("/signup", (req, res) => {
  res.render("pages/signup");
});
router.post("/signup", userController.signupUser);
router.get("/", userController.index);
router.get("/login", userController.loginForm);
router.get("/verify-email", userController.verifyUser);
router.get("/forgotPassword", userController.forgotPasswordForm);
router.post("/signup", userController.signupUser);
router.post("/login", userController.loginUser);
router.post("/forgotPassword", userController.forgotPasswordSubmit);
router.post("/updateUserSettings", userController.updateSettings);

module.exports = router;
