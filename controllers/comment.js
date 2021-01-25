// Import Comment model
const Comment = require('../models/Comment');
const Post = require('../models/Post');

// Get All Comments by Parent Id
exports.all = async (req, res) => {
    try{
        const distinctDates = await Comment.aggregate(
            [
              {
                $group: {
                  _id: { $dateToString: { format: "%Y-%m-%d", date: "$creation_date" } }
                }
              }
            ]
          );

        console.log(distinctDates)
        if (0 < req.query.page && req.query.page <= distinctDates.length){
            var lowerDate = new Date(distinctDates[parseInt(req.query.page) - 1]["_id"]);
            var upparDate = new Date(lowerDate);
            upparDate.setDate(lowerDate.getDate()+1);
            upparDate.toLocaleDateString();
            console.log(lowerDate);
            console.log(upparDate);
        }
        else{
            res.json({
                status: "ERROR",
                message: "Page parameter is invalid or not specified",
            });
        }

        const comments = await Comment
        .find({parent_id:req.body.parentId, creation_date:{$gte:lowerDate, $lt:upparDate}})
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
        const updatedPost = await Post.findOneAndUpdate({_id: req.body.parentId}, 
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
        const deletedComment = await Comment.deleteOne({_id: req.params.commentId});
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
