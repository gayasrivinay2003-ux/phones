const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        //required: true
    },

    email: {
        type: String,
       // required: true,
        unique: true
    },

    password: {
        type: String,
       // required: true
    },
    phone_name: {
        type: String
    },

    brand: {
        type: String
    },

    price: {
        type: Number,
    },
    ram: {
        type: String,
    },
    storage: {
        type: String
    },
    image: {
        type: String
    }
    

});

module.exports = mongoose.model("User", UserSchema);