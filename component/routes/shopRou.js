const express = require("express");
const shopModel = require("../models/shopModel");

const app = express();

app.post("/addShop", async (request, response) => {
    const shop = new shopModel(request.body);
    try {
      await shop.save();
      response.send(shop);
    } catch (error) {
      response.status(500).send(error);
    }
});

app.get("/getAllShop", async (request, response) => {
    const shop = await shopModel.find({});
    try{
        response.send(shop)
    }catch(error){
        response.status(500).send(error)
    }
})
module.exports = app;