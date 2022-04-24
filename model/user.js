const { Schema, model }  = require('mongoose');

const userSchema = new Schema({
    id: String,
    state: String,
});

module.exports = model('users', userSchema);
