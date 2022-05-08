const { Schema, model, SchemaType } = require('mongoose');


const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      date: Date,
      default: Date.now
    },
    userName: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: true,
  }
);

thoughtSchema.virtual('reactionCount')
.get(function () {
  const reactionLength = this.reactions.length;
  return `${reactionLength}`;
}).set(reactionLength);

