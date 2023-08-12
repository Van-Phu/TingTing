const express = require("express");
const orderModel = require("../models/orderModel");

const app = express();



app.get("/getAllOrder", async (request, response) => {
    const order = await orderModel.find({});
    try{
        response.send(order)
    }catch(error){
        response.status(500).send(error)
    }
})

app.post("/addNewOrder", async (request, response) => {
    const orderData = request.body
    const productID = orderData.items.product
    const quantity = orderData.items.quantity
    const customerID = orderData.customer
    try{
      const exitingOrder = await orderModel.findOne({"items.product" : productID})
      const userexiting = await orderModel.findOne({"customer": customerID})
      if(exitingOrder && userexiting){
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

//get product by customer id


app.get('/getOrderByID/:_id', async (req, res) => {
  try {
    const order = await orderModel.find({ _id: req.params._id });
    res.json(order);
  }catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/getOrderByCusID/:_id', async (req, res) => {
  try {
    const orders = await orderModel.find({ customer: req.params._id });
    const dataWithChecked = orders.map((item) => ({...item.toObject(),checked: false}))
    res.json(dataWithChecked);
  }catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/getAllOrderByCus/:customerId', async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const orders = await orderModel.find({ customer: customerId }).populate('customer').populate('items.product');
    const dataWithChecked = orders.map((item) => ({...item.toObject(),checked: false}))
    res.json(dataWithChecked)
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/getAllOrderSelectedByID/:_id', async (req, res) => {
  try {
    const _id = req.params._id;
    const orders = await orderModel.find({ _id: _id }).populate('items.product');
    res.json(orders)
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/deleteOrderById/:id', function (req, res) {
  orderModel.findByIdAndRemove(req.params.id)
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

app.put('/addQuantity/:_itemId', async function (req, res) {
  try {
    const order = await orderModel.findById(req.params._itemId);
    console.log(order)

    if (!order) {
      return res.status(404).json({ error: "Không tìm thấy đơn hàng chứa mục hàng" });
    }
    else{
      order.items.quantity += 1;
    }
    await order.save();
    console.log('Đã thêm 1 vào số lượng của mục hàng');
    res.status(200).json({ message: 'Đã thêm 1 vào số lượng của mục hàng' });
  } catch (error) {
    console.log('Lỗi:', error);
    res.status(500).json({ error: 'Có lỗi xảy ra khi thêm số lượng cho mục hàng' });
  }
});

app.put('/decreaseQuantity/:_itemId', async function (req, res) {
  try {
    const order = await orderModel.findById(req.params._itemId);
    console.log(order)

    if (!order) {
      return res.status(404).json({ error: "Không tìm thấy đơn hàng chứa mục hàng" });
    } else {
      if (order.items.quantity > 1) {
        order.items.quantity -= 1;
      } else {
        const message = 'Số lượng của mục hàng đã đạt 0. Bạn có muốn xóa không?';
        return res.status(201).json({ message });
      }
    }
    await order.save();
    console.log('Đã xóa 1 trong số lượng của mục hàng');
    res.status(200).json({ message: 'Đã xóa 1 trong số lượng của mục hàng' });
  } catch (error) {
    console.log('Lỗi:', error);
    res.status(500).json({ error: 'Có lỗi xảy ra khi thêm số lượng cho mục hàng' });
  }
});



module.exports = app;