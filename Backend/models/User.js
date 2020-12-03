const mongoose=require('mongoose');

const User=new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    feedback: [{
        type: String
    }]

})

module.exports= mongoose.model('user', User);