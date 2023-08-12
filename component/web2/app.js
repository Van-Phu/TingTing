const express = require('express');
const mongoose = require('mongoose');
const path = require('path');


mongoose.connect('mongodb://127.0.0.1:27017/nomoapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (email) {
        // Regular expression to validate email address format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      },
      message: 'Email không hợp lệ!!',
    }
  },
  fullName: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: "https://bathanh.com.vn/wp-content/uploads/2017/08/default_avatar.png",
    require: true
  },
  background: {
    type: String,
    default: "https://wallpaperaccess.com/full/1278186.jpg",
    require: true
  },
  type:{
    type: Number,
    default: 0,
    require:true
  },
  image: {
    type: Array,
    default: ["https://st.depositphotos.com/2934765/53192/v/600/depositphotos_531920820-stock-illustration-photo-available-vector-icon-default.jpg"]
  },
  address: {
    type: Object,
    default: {"city" : "Ho Chi Minh"}
  },
  cost:{
    type: Number,
    require:false,
    default: 0
  }
})

const deliverySchema = new mongoose.Schema({
  idProduct:{
   type: String,
   required: true
  },
  customer:{
   type: String,
   required: true
  },
  totalPrice:{
   type: Number,
   required:true
  },
  address:{
   type: String,
   required:true
  },
  typeOfPayment:{
   type: String,
   required: true
  },
  delivery:{
   type:String,
   required: true
  },
  status:{
   type: String,
   enum: ['pending', 'processing', 'shipped', 'delivered'],
   default: 'pending'
  },
  quantity:{
   type: Number,
   require:true
  }
 });

const supplierSchema = new mongoose.Schema({
  nameShop: String,
  address: String,
  phoneNumber: String, 
  cccd: String,
  idCollab: String
});



const Supplier = mongoose.model('Sigupcollabdrawns', supplierSchema);
const Signup = mongoose.model('singupdrawns', supplierSchema);
const userModel = mongoose.model('user', UserSchema)
const Delivery = mongoose.model('delivery',deliverySchema)

const app = express();
app.use(express.static(path.join(__dirname, 'web')));

app.get('/collab', (req, res) => {
  res.sendFile(path.join(__dirname, 'web.html'));
});

app.get('/sigupcollabdrawn', async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.json(suppliers);
  } catch (error) {
    console.error('Failed to fetch suppliers', error);
    res.status(500).json({ error: 'Failed to fetch suppliers' });
  }
});

app.get('/singupdrawns', async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.json(suppliers);
  } catch (error) {
    console.error('Failed to fetch suppliers', error);
    res.status(500).json({ error: 'Failed to fetch suppliers' });
  }
});

app.post('/suppliers/:cccd/accept', async (req, res) => {
  const cccd = req.params.cccd;
  try {
    const supplier = await Supplier.findOne({ cccd: cccd });
    if (!supplier) {
      return res.status(404).json({ error: 'Supplier not found' });
    } else {
      const acceptedSupplier = new Signup({
        nameShop: supplier.nameShop,
        address: supplier.address,
        phoneNumber: supplier.phoneNumber,
        cccd: supplier.cccd,
        idCollab: supplier.idCollab
      });

      try {
        const updatedUser = await userModel.findByIdAndUpdate(
          supplier.idCollab,
          { $set: { type: 1 } },
          { new: true }
        );

        if (!updatedUser) {
          return res.status(404).json({ error: 'User not found' });
        }
        await acceptedSupplier.save();
        await Supplier.findOneAndDelete({ cccd: cccd });
        res.json({ message: "Hello" });
      } catch (error) {
        console.error('Failed to update user type', error);
        res.status(500).json({ error: 'Failed to update user type' });
      }
    }
  } catch (error) {
    console.error('Failed to accept suppl ier', error);
    res.status(500).json({ error: 'Failed to accept supplier' });
  }
});

app.use(express.static(path.join(__dirname, 'delivery')));
app.delete('/suppliers/:cccd/reject', async (req, res) => {
  const cccd = req.params.cccd;

  try {
    const deletedSupplier = await Supplier.findOneAndDelete({ cccd: cccd });
    if (!deletedSupplier) {
      res.status(404).json({ error: 'Supplier not found' });
    } else {
      res.json({ message: 'Supplier rejected and removed from registration table' });
    }
  } catch (error) {
    console.error('Failed to reject supplier', error);
    res.status(500).json({ error: 'Failed to reject supplier' });
  }
});

app.delete('/delivery/:_id/reject', async (req, res) => {
  const _id = req.params._id;
  try {
    const deleteDelivery = await DeliveryModel.findOneAndDelete({ _id: _id });
    if (!deleteDelivery) {
      res.status(404).json({ error: 'Delivery not found' });
    } else {
      res.json({ message: 'Delivery rejected and removed from the table' });
    }
  } catch (error) {
    console.error('Failed to reject delivery', error);
    res.status(500).json({ error: 'Failed to reject delivery' });
  }
});

app.get('/getAllDelivery', async (req, res) => {
  try {
    const query = {status: "pending"}
    const delivery = await Delivery.find(query);
    res.json(delivery);
  } catch (error) {
    console.error('Failed to fetch suppliers', error);
    res.status(500).json({ error: 'Failed to fetch suppliers' });
  }
});

app.get('/getDelivery', async (req, res) => {
  try {
    
    const query = {status: "pending"}
    const delivery = await Delivery.find(query);
    res.json(delivery);
  } catch (error) {
    console.error('Failed to fetch suppliers', error);
    res.status(500).json({ error: 'Failed to fetch suppliers' });
  }
});


app.post('/delivery/:_id/accept', async (req, res) => {
  const id = req.params._id;
  try {
    const delivery = await Delivery.findOne({ _id: id });
    if (!delivery) {
      return res.status(404).json({ error: 'Supplier not found' });
    } else {
      try {
        const updateDelivery = await Delivery.findByIdAndUpdate(
          id,
          { $set: { status: "delivered" } },
          { new: true }
        );
        await delivery.save();
          
        res.json({ message: "Thêm thành công!" });
      } catch (error) {
        console.error('Failed to update user type', error);
        res.status(500).json({ error: 'Failed to update user type' });
      }
    }
  } catch (error) {
    console.error('Failed to accept supplier', error);
    res.status(500).json({ error: 'Failed to accept supplier' });
  }
});


app.get('/delivery', (req, res) => {
  res.sendFile(path.join(__dirname, 'delivery.html'));
});

app.listen(5001, () => {
  console.log('Server started on port 5001');
});
