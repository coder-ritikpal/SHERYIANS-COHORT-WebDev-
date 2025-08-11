const postModel = require('../models/post.model');
const generateCaption = require('../service/ai.service');

async function createPostController(req, res) {
    try {
        const file = req.file;

        if (!file) {
            return res.status(400).json({ message: 'No file uploaded.' });
        }

        const base64Image = Buffer.from(file.buffer).toString('base64');

        const caption = await generateCaption(base64Image);

        const post = await postModel.create({
            image: base64Image,
            caption,
            user: req.user?._id 
        });

        res.status(201).json({
            message: 'Post created successfully.',
            caption
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error. Could not create post.' });
    }
}

module.exports = { createPostController };
