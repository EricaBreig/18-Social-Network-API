const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');

// ==================== Schema to create the User model ==================== 
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, `Please fill a valid email address :3`]
    },
    thoughts: {
        type: Schema.Types.ObjectId,
        ref: "Thought",
    },
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);
// ==================== schema ====================
userSchema
  .virtual("friendCount")
  .get(function () {
    return this.friends.length;
  });

const User = model('user', userSchema);

module.exports = User;
