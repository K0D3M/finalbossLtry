const mongoose = require('mongoose');
const user_details_schema = new mongoose.Schema({
    user_id : Number,
    firstname : String,
    lastname : String,
    email : String,
    password : String,
    mobile : String,
    role : String
})

const UserDetails = mongoose.model('UserDetails', user_details_schema);

module.exports = UserDetails; // Export the model directly
