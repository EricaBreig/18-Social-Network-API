const router = require('express').Router();
const {
  getThoughts,
  createThought,
  getSingleThought,
  deleteSingleThought,
  updateSingleThought,
  createReaction,
  deleteReaction,
} = require('../../controllers/thoughts-controllers.js');

// ==================== /api/thoughts ==================== 
router.route('/').get(getThoughts).post(createThought);

// ==================== /api/thoughts/:thoughtId ==================== 
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateSingleThought)
  .delete(deleteSingleThought);

  // ==================== /api/thoughts/:thoughtId/reactions ==================== 
router
.route("/:thoughtId/reactions")
.post(createReaction)
.delete(deleteReaction);

module.exports = router;
