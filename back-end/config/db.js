const mongoose = require('mongoose');
const dbConnect = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/ChatAppDB');
        console.log('mongoose connection successfully!')
    } catch (error) {
        conosole.log(error);
    }
}
module.exports = dbConnect;