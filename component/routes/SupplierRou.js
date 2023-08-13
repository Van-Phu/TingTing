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

app.get('/getSuppliersByIdCollab/:idCollab', async (req, res) => {
  try {
    const supplier = await supplierModel.findOne({ idCollab: req.params.idCollab});
    res.json(supplier);
  }catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.patch("/updateSuppliersByIdCollab/:_id", async (request, response) => {
  const { _id } = request.params;
  const updates = request.body;
  try {
    const supplier = await supplierModel.findByIdAndUpdate(_id, updates, { new: true });
    response.send({
      message: "Update Thành Công", 
      supplier: supplier
    });
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = app;
