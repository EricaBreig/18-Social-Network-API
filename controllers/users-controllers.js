const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");


module.exports = {
  // ==================== Get all users ====================
  getUsers(req, res) {
    User.find()
      .then(async (users) => {
        const userObj = {
          users,
        };
        return res.json(userObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // ==================== Get a single user ====================
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .lean()
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: "El gasp! There's no user with that ID!" })
          : res.json({
              user,
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // ==================== create a new user ====================
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  // ==================== Update a single user ====================
  updateSingleUser(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true })
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // ==================== Delete a user ====================
  async deleteSingleUser(req, res) {
    try {
      const deletedUser = await User.findOneAndRemove({
        _id: req.params.userId,
      });
      if (deletedUser) {
        await Thought.deleteMany({
          _id: deletedUser.thoughts,
        });
        res
          .status(200)
          .json({ message: "This user & their thougts have been r e m o v e d !  :o" });
      } else {
        res.status(404).json({ message: "El gasp! No such user exists :O" });
      }
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  },

  // ==================== Give user a friend ====================
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: "Sowwy! No user found with that ID :(" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // ==================== Remove a friend from a user's friend list ====================
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that ID :(" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};
