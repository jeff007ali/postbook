// Import Post model
const Post = require('../models/Post');

// Get All Posts
exports.all = async (req, res) => {
    try{
        const posts = await Post.find().sort('-creation_date');
        res.json({
            status: "SUCCESS",
            data: posts
        });
    }catch(err){
        res.json({
            status: "ERROR",
            message: err,
        });
    }
};

// Create Post
exports.create = async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    try{
        const craetedPost = await post.save();
        res.json({
            status: "SUCCESS",
            data: craetedPost
        });
    }catch(err){
        res.json({
            status: "ERROR",
            message: err,
        });
    }
};

// Get specific post using Post Id
exports.view = async (req, res) => {
    try{
        const post = await Post.findById(req.params.postId);
        res.json({
            status: "SUCCESS",
            data: post
        });
    }catch(err){
        res.json({
            status: "ERROR",
            message: err,
        });
    }
};

// Update specific Post using Post Id
exports.update = async (req, res) => {
    try{
        const updatedPost = await Post.updateOne({_id: req.params.postId}, 
            {$set: {title: req.body.title, 
                description: req.body.description}}
        );
        res.json({
            status: "SUCCESS",
            data: updatedPost
        });
    }catch(err){
        res.json({
            status: "ERROR",
            message: err,
        });
    }
};

// Delete specific post using Post Id
exports.delete = async (req, res) => {
    try{
        const deletedPost = await Post.remove({_id: req.params.postId});
        res.json({
            status: "SUCCESS",
            data: deletedPost
        });
    }catch(err){
        res.json({
            status: "ERROR",
            message: err,
        });
    }
};
