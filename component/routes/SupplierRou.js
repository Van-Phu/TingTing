const express = require("express");
const app = express(); 
const supplierModel = require("../models/SupplierModel");


app.get("/getAllSuppliers", async (req, res) => {
  try {
    const suppliers = await supplierModel.find();
    res.json(suppliers);
  } catch (error) {
    console.error('Failed to fetch suppliers', error);
    res.status(500).json({ error: 'Failed to fetch suppliers' });
  }
});

// app.get('/getProductByName/:productName', async (req, res) => {
//   try {
//     const product = await productModel.findOne({ productName: req.params.productName });
//     res.json(product);
//   }catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

app.get('/getSuppliersByIdCollab/:idCollab', async (req, res) => {
  try {
    const supplier = await supplierModel.findOne({ idCollab: req.params.idCollab});
    res.json(supplier);
  }catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = app;
