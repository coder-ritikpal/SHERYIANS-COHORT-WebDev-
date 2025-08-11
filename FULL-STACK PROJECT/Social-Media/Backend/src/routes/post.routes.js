const express = require('express');
const router = express.Router();

const {createPostController} = require('../controllers/post.controller');
const multer = require('multer');
const authMiddleware = require('../middlewares/auth.middleware');


const upload = multer({ storage: multer.memoryStorage()})



router.post('/',authMiddleware,upload.single("image"),createPostController)


module.exports = router;