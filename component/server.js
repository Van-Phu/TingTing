const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());
mongoose.connect('mongodb://127.0.0.1:27017/nomoapp',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

const accountRouter = require("./routes/userRou")
// const shortVideorouter = require("./routes/ShortVideo")
const productRouter = require("./routes/productRou")
const orderRouter = require("./routes/orderRou")
const endpointOrder = require("./routes/endpointOrder")
const shopRouter = require("./routes/shopRou")
const deliveryRouter = require("./routes/deliveryRou")
const historyOrder = require("./routes/historyOrderRou")
const orderDelivery = require("./routes/orderDeliveyRou")
const providers = require("./routes/sigupCollabDrawn")
const supplier = require("./routes/SupplierRou")

app.use('/api/v1/users', accountRouter);
// app.use('/api/v1/shortVideo', shortVideorouter);
app.use('/api/v1/product', productRouter)
app.use('/api/v1/order', orderRouter)
app.use('/api/v1/endpointOrder', endpointOrder)
app.use('/api/v1/shop', shopRouter)
app.use('/api/v1/delivery', deliveryRouter)
app.use('/api/v1/history', historyOrder)
app.use('/api/v1/orderdelivery', orderDelivery)
app.use('/api/v1/providers', providers)
app.use('/api/v1/supplier', supplier)

app.listen(5000, () => {
  console.log("Server is running at port 5000");
});