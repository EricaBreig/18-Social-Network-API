const { Schema, Types } = require('mongoose');
const ObjectId = require("mongodb").ObjectId;

const reactionSchema = new Schema(
  {
   reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
      max_length:50,
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = reactionSchema;
