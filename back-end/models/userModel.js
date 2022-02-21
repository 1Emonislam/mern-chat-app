const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    pic: {
        type: String,
        default:'https://www.booksie.com/files/profiles/22/mr-anonymous_230x230.png'
    }

})
const User = mongoose.model('User',userSchema);
module.exports = User;