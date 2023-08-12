const { Double } = require("mongodb");
const mongoose = require("mongoose");

const collabDrawnSchema = new mongoose.Schema({
    nameShop: {
        type: String,
        required: true,
      },
      address:{
        type: String,
        required: true,
      },
      phoneNumber:{
        type: String,
        required: true,
      },
      cccd:{
        type: String,
        required:true,
      },
      idCollab:{
        type: String,
        ref: 'users',
       
      }
});

const collabDrawn = mongoose.model("singupdrawns", collabDrawnSchema);
module.exports = collabDrawn;