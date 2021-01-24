// Import Comment model
const Comment = require('../models/Comment');

// Get All Comments by Parent Id
exports.all = async (req, res) => {
    try{
        const comments = await Comment.find({parent_id:req.body.parentId})
        .sort('-creation_date');
        res.json({
            status: "SUCCESS",
            data: comments
        });
    }catch(err){
        res.json({
            status: "ERROR",
            message: err,
        });
    }
};

// Create Comment
exports.create = async (req, res) => {
    const comment = new Comment({
        text: req.body.text,
        parent_id: req.body.parentId
    });

    try{
        const createdComment = await comment.save();
        Post.findOneAndUpdate({_id: req.body.parentId}, 
            {$inc: {no_of_comment: 1}}
        );
        res.json({
            status: "SUCCESS",
            data: createdComment
        });
    }catch(err){
        res.json({
            status: "ERROR",
            message: err,
        });
    }

    // try{
    //     console.log("in update")
    //     const updatedPost = await Post.findOneAndUpdate({_id: req.body.parentId}, 
    //         {$inc: {no_of_comment: 1}}
    //     );
        
    // }catch(err){
    //     res.json({
    //         status: "ERROR",
    //         message: err,
    //     });
    // }

    
    
};

// Get specific comment using Comment Id
exports.view = async (req, res) => {
    try{
        const comment = await Comment.findById(req.params.commentId);
        res.json({
            status: "SUCCESS",
            data: comment
        });
    }catch(err){
        res.json({
            status: "ERROR",
            message: err,
        });
    }
};

// Update specific comment using Comment Id
exports.update = async (req, res) => {
    try{
        const updatedComment = await Comment.updateOne({_id: req.params.commentId}, 
            {$set: {text: req.body.text,
                parent_id: req.body.parentId}}
        );
        res.json({
            status: "SUCCESS",
            data: updatedComment
        });
    }catch(err){
        res.json({
            status: "ERROR",
            message: err,
        });
    }
};

// Delete specific comment using Comment Id
exports.delete = async (req, res) => {
    try{
        const deletedComment = await Comment.remove({_id: req.params.commentId});
        res.json({
            status: "SUCCESS",
            data: deletedComment
        });
    }catch(err){
        res.json({
            status: "ERROR",
            message: err,
        });
    }
};
