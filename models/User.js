// Schema to create User model
const { Schema, model, SchemaType } = require('mongoose');
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
      // runValidators: true, context: 'query'
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thoughts',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    ]
  },
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
    },
    id: true,
  }
);
userSchema.plugin(uniqueValidator);

// Create a virtual property `fullName` that gets and sets the user's full name
userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    const friendLength = this.friends.length;
    return `${friendLength}`;
  }).set(friendLength);
  // Setter to set the first and last name
 

// Initialize our User model
const User = model('users', userSchema);
//todo add uniqueValidator to exports?
module.exports = User;
