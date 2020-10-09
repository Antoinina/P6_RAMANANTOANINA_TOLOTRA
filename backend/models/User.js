const mongoose = require('mongoose'),
      uniqueValidator = require('mongoose-unique-validator');

/* User data model */
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true }, // Not use the same email adress for different users
    password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);