const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");

router.get("/signup", (req, res) => {
  res.render("pages/signup");
});
router.post("/signup", userController.signupUser);
// ✅ Email verification route
router.get("/verify-email", userController.verifyUser);

router.get("/", userController.index);
router.get("/login", userController.loginForm);
router.get("/forgotPassword", userController.forgotPasswordForm);
router.post("/signup", userController.signupUser);
router.post("/login", userController.loginUser);
router.post("/logout", userController.logoutUser);

router.post("/forgotPassword", userController.forgotPasswordSubmit);
router.post("/updateUserSettings", userController.updateSettings);

// Optional admin routes
router.get("/admin", userController.adminPanel);
router.post("/admin/delete-user", userController.deleteUser);
router.post("/admin/remove-task", userController.removeTask);
router.post("/admin/update-level", userController.updateLevel);
router.post("/resetPassword", userController.resetPasswordSubmit);

module.exports = router;
