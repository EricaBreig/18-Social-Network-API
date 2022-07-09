const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');

// ==================== Schema to create the User model ==================== 
const studentSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      max_length: 50,
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

userSchema
  .virtual("friendCount")
  .get(function () {
    return this.friends.length;
  });

const User = model('user', userSchema);

module.exports = User;
