const express = require("express");
const orderModel = require("../models/orderModel");

const app = express();



app.get("/getAllHistoryOrder", async (request, response) => {
    const order = await orderModel.find({});
    try{
        response.send(order)
    }catch(error){
        response.status(500).send(error)
    }
})

app.post("/addNewHistoryOrder", async (request, response) => {
    const orderData = request.body
    const productID = orderData.items.product
    const quantity = orderData.items.quantity
    try{
      const exitingOrder = await orderModel.findOne({"items.product" : productID})
      if(exitingOrder){
        exitingOrder.items.quantity += quantity
        await exitingOrder.save();
        response.send(exitingOrder);
      }else{
        const order = new orderModel(orderData);
        await order.save();
        response.send(order);
      }
    }catch{
      response.status(500).send(error);
    }
});

module.exports = app;