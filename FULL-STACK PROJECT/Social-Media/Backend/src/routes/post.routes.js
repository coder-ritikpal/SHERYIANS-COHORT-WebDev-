const express = require('express');
const router = express.Router();

const { createPostController } = require('../controllers/post.controller');
const postModel = require('../models/post.model'); // ✅ import postModel
const multer = require('multer');
const authMiddleware = require('../middlewares/auth.middleware');

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 20 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    }
});

// Create post
router.post(
    '/',
    authMiddleware,
    upload.single("image"), // ✅ must match frontend FormData key
    (err, req, res, next) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ message: err.message });
        } else if (err) {
            return res.status(400).json({ message: err.message });
        }
        next();
    },
    createPostController
);

// Get all posts
router.get('/', async (req, res) => { // ✅ changed to "/"
    try {
        const posts = await postModel.find().populate("user", "username");
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch posts" });
    }
});

module.exports = router;
