const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController.js')


//Public Routes
router.post('/register', userController.userRegistration);
router.post('/login', userController.userLogin)
router.get('/all', userController.getAllUsers)
router.post("/reset-password", userController.resetPassword);
router.post("/reset-password/:userId/:token", userController.resetPasswordFromLink);
router.post("/reset-password-otp", userController.resetPasswordWithOTP);
router.post("/reset-password-otp/:userId/:token", userController.resetPasswordFromLink);


//Private Routes
router.post("/delete/:id", userController.deleteUser);
router.get("/:id", userController.getUserById);

module.exports = router