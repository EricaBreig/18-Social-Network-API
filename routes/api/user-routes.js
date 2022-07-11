const router = require("express").Router();
const {
  getUsers,
  createUser,
  getSingleUser,
  updateSingleUser,
  addFriend,
  deleteFriend,
  deleteSingleUser,
} = require("../../controllers/users-Controllers");

// ==================== /api/users ====================
router.route("/").get(getUsers).post(createUser);

// ==================== /api/users/:userId ====================
router.route("/:userId").get(getSingleUser).put(updateSingleUser);

// ==================== /api/users/:userId/friends/:friendId ====================
router
  .route("/:userId/friends/:friendId")
  .post(addFriend)
  .delete(deleteFriend)
  .delete(deleteSingleUser);

module.exports = router;
