const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deliverySchema = new Schema({
   idProduct:{
    type: Schema.Types.ObjectId,
    ref: 'products',
    required: true
   },
   customer:{
    type: Schema.Types.ObjectId,
    ref: 'users',
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

const Delivery = mongoose.model("delivery", deliverySchema);
module.exports = Delivery;