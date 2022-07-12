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
      get: leDate,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

function leDate(date) {
  const sDate = date.toLocaleString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return sDate;
}

module.exports = reactionSchema;
