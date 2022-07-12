
const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

// ==================== Schema to create Thought model ==================== 
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min_length: 1,
      max_length: 280,
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now(),
      get: leDate,
      // ==================== getter method to format the timestamp on query ==================== 
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
      getRandomEmail
    },
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

// ==================== schema ====================
thoughtSchema
  .virtual("reactionCount") 
  .get(function () {
    return this.reactions.length;
  });

const Thought = model("thought", thoughtSchema);

module.exports = Thought;