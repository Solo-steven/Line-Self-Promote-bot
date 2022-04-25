const { Schema, model }  = require('mongoose');

const userSchema = new Schema({
    id: String,
    state: String,
    timestamp: Number,
});

module.exports = model('users', userSchema);
