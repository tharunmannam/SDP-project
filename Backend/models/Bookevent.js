const mongoose=require('mongoose');

const book=new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    BookingId: {
        type: Number,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    Event_Type: {
        type: String,
        required: true
    },
    Event_Place: {
        type: String,
        required: true
    },
    No_of_Guests:{
        type: Number,
        required: true
    },
    Event_Date: {
        type: String,
        required: true
    },
    Equipment: {
        type: String,
        required: true
    },
    Food: {
        type: String,
        required: true
    },
    Food_type: {
        type: String,
        required: true
    },
    Seats: {
        type: Number,
        required: true
    }
});

module.exports=mongoose.model('BookEvent',book);