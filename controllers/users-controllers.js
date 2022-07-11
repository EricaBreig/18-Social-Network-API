const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

// ==================== Aggregate function to get the number of users overall ==================== 
// const headCount = async () =>
//   User.aggregate()
//     .count('userCount')
//     .then((numberOfUsers) => numberOfUsers);

// ==================== Aggregate function for getting the overall  grade using $avg ==================== 
// const grade = async (userId) =>
//   User.aggregate([
//     // === only include the given user by using $match ===
//     { $match: { _id: ObjectId(userId) } },
//     {
//       $unwind: '$assignments',
//     },
//     {
//       $group: {
//         _id: ObjectId(userId),
//         overallGrade: { $avg: '$assignments.score' },
//       },
//     },
//   ]);

module.exports = {
  // ==================== Get all users ==================== 
  getUsers(req, res) {
    User.find()
      .then(async (users) => {
        const userObj = {
          users,
          headCount: await headCount(),
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
          ? res.status(404).json({ message: "No user with that ID" })
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
  // ==================== Delete a user and remove them from the site ==================== 
  async deleteSingleUser(req, res) {
    try {
      const removedUser = await User.findOneAndRemove({
        _id: req.params.userId,
      });
      if (removedUser) {
        await Thought.deleteMany({
          _id: removedUser.thoughts,
        });
        res
          .status(200)
          .json({ message: "Removed user and associated thoughts" });
      } else {
        res.status(404).json({ message: "No such user exists" });
      }
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  },

  // ==================== Add a friend ==================== 
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "Sowwy! No user found with that ID :(" })
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
