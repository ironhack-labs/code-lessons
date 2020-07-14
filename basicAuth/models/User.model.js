const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs')

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, 'Username is required.'],
      unique: [true, 'User name is alredy in use']
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: [true, 'This mail is alredy in use'],
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

userSchema.methods.checkPassword = function(password){
  return bcrypt.compare(password, this.password)
}

module.exports = model('User', userSchema);
