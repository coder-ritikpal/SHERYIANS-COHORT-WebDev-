const postModel = require('../models/post.model');
const generateCaption = require('../service/ai.service');
const uploadFile = require('../service/storage.service');
const { v4: uuidv4 } = require('uuid');

async function createPostController(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded.' });
        }
        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated.' });
        }

        const base64Image = Buffer.from(req.file.buffer).toString('base64');

        let caption;
        try {
            caption = await generateCaption(base64Image);
        } catch (err) {
            console.error('❌ Caption generation failed:', err);
            return res.status(500).json({ message: 'Could not generate caption.' });
        }

        const extension = req.file.originalname.split('.').pop();
        const uniqueFileName = `${uuidv4()}.${extension}`;

        let uploadedFile;
        try {
            uploadedFile = await uploadFile(req.file.buffer, uniqueFileName);
        } catch (err) {
            console.error('❌ File upload failed:', err);
            return res.status(500).json({ message: 'File upload failed.' });
        }

        const post = await postModel.create({
            image: uploadedFile.url,
            caption,
            user: req.user._id
        });

        res.status(201).json({
            message: '✅ Post created successfully',
            post
        });

    } catch (error) {
        console.error('❌ Server error:', error);
        res.status(500).json({ message: 'Server error. Could not create post.' });
    }
}

module.exports = { createPostController };
