const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderDelivery = new Schema({
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  items: {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'products',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1
    },
    price: {
      type: Number,
      required: true,
      min: 0
    }
  },
  total: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('orderdelivery', orderDelivery);