const mongoose = require('mongoose');

/* Sauce data model */
const sauceSchema = mongoose.Schema({
    userId: { type: String },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: String, required: true },
    likes: { type: Number },
    dislikes: { type: Number },
    usersLiked: { type: Array },
    usersDisliked: { type: Array }
});

module.exports = mongoose.model('Sauce', sauceSchema);