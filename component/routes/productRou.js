const express = require("express");
const productModel = require("../models/productModel");
const app = express();

app.post("/addProduct", async (request, response) => {
    const product = new productModel(request.body);
    try {
      await product.save();
      response.send(product);
    } catch (error) {
      response.status(500).send(error);
    }
});

app.get("/getAllProduct", async (request, response) => {
    const product = await productModel.find({});
    try{
        response.send(product)
    }catch(error){
        response.status(500).send(error)
    }
})

app.get("/getProductFlashSale", async (request, response) => {
  const query = {status: 1}
  const product = await productModel.find(query);
  try{
      response.send(product)
  }catch(error){
      response.status(500).send(error)
  }
})


app.get('/getProductByID/:_id', async (req, res) => {
  try {
    const product = await productModel.findOne({ _id: req.params._id });
    res.json(product);
  }catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.get('/getProductByName/:productName', async (req, res) => {
    try {
      const product = await productModel.findOne({ productName: req.params.productName });
      res.json(product);
    }catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.get("/findProduct", (req, res) => {
    const { query } = req.query;
    productModel.find({
      productName: { $regex: query, $options: "i" }
    })
      .then(products => res.json(products))
      .catch(error => res.status(500).json({ error }));
  });

  app.get('/getProductByShopId/:idCollab', async (req, res) => {
    try {
      const product = await productModel.find({ idCollab: req.params.idCollab });
      res.json(product);
    }catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.patch("/updateAllProducts/:_id", async (request, response) => {
    const { _id } = request.params;
    const updates = request.body;
    try {
      const product = await productModel.findByIdAndUpdate(_id, updates, { new: true });
      response.send({
        message: "Update Thành Công", 
        product: product
      });
    } catch (error) {
      response.status(500).send(error);
    }
  });

  app.delete("/deleteProductById/:_id", async (request, response) => {
    const { _id } = request.params;
    try {
      const deletedProduct = await productModel.findByIdAndDelete(_id);
      response.send({
        message: "Delete Thành Công", 
        deletedProduct: deletedProduct
      });
    } catch (error) {
      response.status(500).send(error);
    }
  });
  
  
  module.exports = app;