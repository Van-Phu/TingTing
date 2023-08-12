const express = require("express");
const DeliveryModel = require("../models/deliveryModel");
const app = express(); 

app.get("/getAllDelivery", async (request, response) => {
    const delivery = await DeliveryModel.find({});
    try{
        response.send(delivery)
    }catch(error){
        response.status(500).send(error)
    }
})


app.post("/addNewDelivery", async (request, response) => {
    const delivery = new DeliveryModel(request.body);
    try {
      await delivery.save();
      response.send(delivery);
    } catch (error) {
      response.status(500).send(error);
    }
});

app.get('/getPending/:customer', async (request, response) => {
  const userId = request.params.customer;
  const query = {customer: userId, status: "pending"};
  try {
    const pending = await DeliveryModel.find(query).populate('idProduct');
    response.send(pending);
  } catch (error) {
    response.status(500).send(error);
  }
  });

  app.get("/getDelivered/:customer", async (request, response) => {
    const userId = request.params.customer;
    const query = { customer: userId, status: "delivered"};
  
    try {
      const delivered = await DeliveryModel.find(query).populate('idProduct');
      response.send(delivered);
    } catch (error) {
      response.status(500).send(error);
    }
  });

  app.get('/getAllDelivery/:_id', async (req, res) => {
    try {
      const _id = req.params._id;
      const delivery = await DeliveryModel.find({ customer: _id }).populate('idProduct');
      res.json(delivery);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.get('/getDeliveryById/:_id', async (req, res) => {
    try {
      const _id = req.params._id;
      const delivery = await DeliveryModel.find({ _id: _id }).populate('idProduct');
      res.json(delivery);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.get('/deleteDelivery/:id', function (req, res) {
    DeliveryModel.findByIdAndRemove(req.params.id)
      .then((doc) => {
        if (doc) {
          res.status(200).json({ data: "Xoa thanh cong!!" });
          console.log("Xoa thanh cong!!");
        } else {
          res.status(404).json({ error: "Khong tim thay don hang!" });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "Co loi xay ra khi xoa!" });
      });
  });

  app.put('/delevered/:_id', async (req, res) => {
    try {
      const _id = req.params._id;
      const newStatus = req.body.status;
      const updatedDelivery = await DeliveryModel.findByIdAndUpdate(
        _id,
        { $set: { status: newStatus } },
        { new: true }
      );
      if (!updatedDelivery) {
        return res.status(404).json({ error: 'Delivery not found' });
      }
      res.json("Giao hàng thành công!!");
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  
  


module.exports = app;