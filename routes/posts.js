const router = require('express').Router();

// Import post controller
var postController = require('../controllers/post');

// Post routes
router.route('/')
    .get(postController.all)
    .post(postController.create);

router.route('/:postId')
    .get(postController.view)
    .patch(postController.update)
    .put(postController.update)
    .delete(postController.delete);

// Export API routes
module.exports = router;