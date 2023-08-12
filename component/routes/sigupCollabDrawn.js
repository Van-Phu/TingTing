const express = require("express");
const sigupCollabDrawn = require("../models/sigupDrawnModel");

const app = express();
app.post('/sigupDrawn', async (request, response) => {
  const sign = new sigupCollabDrawn(request.body);
  try {
    await sign.save();
    response.status(201).send(sign);
  } catch (error) {
    response.status(500).send(error);
  }
});  
module.exports = app;