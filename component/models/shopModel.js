const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema({
    idCollab: {
        type: String,
        ref: 'users',
        require: true
    },
    nameShop: {
        type: String,
        require: true,
    },
    address: {
        type: String,
        require: true
    },

});

const shop = mongoose.model("shop", shopSchema);

module.exports = shop;