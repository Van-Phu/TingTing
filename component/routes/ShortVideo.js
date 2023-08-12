const express = require("express");
const shortVideo = require("../models/shortVideo");
const app = express();

app.get('/videos', async (req, res) => {
    try {
      const videos = await shortVideo.find();
      res.json(videos);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports = app