// Schema to create User model

const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

// Schema to create User model

//* npm install mongoose unique validator
const userSchema = new Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: true,
      trim: true
        }, 
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
      // runValidators: true, context: 'query'
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);
userSchema.plugin(uniqueValidator);

userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return this.friends.length;
     
  })
  // .set(friendLength);
 

// Initialize our User model
const User = model('User', userSchema);

module.exports = User;
