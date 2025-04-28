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
router.post("/logout", userController.logoutUser); // ✅ Now it will work
router.post("/login", userController.loginUser);
router.post("/forgotPassword", userController.forgotPasswordSubmit);
router.post("/updateUserSettings", userController.updateSettings);

router.get("/admin", userController.adminPanel);
router.post("/resetPassword", userController.resetPasswordSubmit);

module.exports = router;
