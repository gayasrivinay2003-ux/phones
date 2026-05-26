const mongoose = require("mongoose");

const PhoneSchema = new mongoose.Schema({

  phone_name: {
    type: String,
  },

  brand: {
    type: String,
  },

  price: {
    type: Number,
  },

  ram: {
    type: String,
  },

  storage: {
    type: String,
  },

  image: {
    type: String,
  },

});

module.exports =
  mongoose.model("Phone", PhoneSchema);