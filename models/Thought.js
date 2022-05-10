const { Schema, model } = require('mongoose');
//going to keep reaction schema in this file 
//instead of export

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
    id: false,
  }
);

thoughtSchema.virtual('reactionCount')
.get(function () {
  const reactionLength = this.reactions.length;
  return `${reactionLength}`;
}).set(reactionLength);

const Thought = model('thoughts', thoughtSchema);


const ObjectId = mongoose.SchemaType.ObjectId;

const reactionSchema = new Schema(
  {
    reactionId: {
      type: ObjectId,
        default: new ObjectId
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    userName: {
      type: String,
      required: true
    },
    createdAt: {
      date: Date,
      default: Date.now
    }
  }
);

module.exports = { Thought }
