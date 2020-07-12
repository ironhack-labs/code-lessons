const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs')

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, 'Username is required.'],
      unique: true
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    // add password property here
    password: {
      type: String,
      minlength: [8, "password min length is 8"]
    }
  },
  {
    timestamps: true
  }
);

userSchema.pre('save', function(next) {
  if (this.isModified('password')){
    bcrypt.hash(this.password, 10)
    .then((hash) => {
      this.password = hash
      next()
    })
  } else {
    next()
  }

})



module.exports = model('User', userSchema);
