const mongoose = require("mongoose");

const ShortVideoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  description: {
    type: String
  }
});

const shortVideo = mongoose.model("shortvideo", ShortVideoSchema);

module.exports = shortVideo;