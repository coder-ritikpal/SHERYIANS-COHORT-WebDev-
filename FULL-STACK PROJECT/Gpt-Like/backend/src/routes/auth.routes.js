const express = require('express');
const  authControllers  = require('../controllers/auth.controllers');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();    

router.post('/register',authControllers.registerUser);
router.post('/login',authControllers.loginUser); 

router.get("/profile", authMiddleware.authUser, (req, res) => {
    res.json({ message: "Welcome to your profile", user: req.user });
});

module.exports = router;