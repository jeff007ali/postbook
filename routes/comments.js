const router = require('express').Router();

// Import post controller
var commentController = require('../controllers/comment');

// Comment routes
router.route('/')
    .get(commentController.all)
    .post(commentController.create);

router.route('/:commentId')
    .get(commentController.view)
    .patch(commentController.update)
    .put(commentController.update)
    .delete(commentController.delete);

// Export API routes
module.exports = router;