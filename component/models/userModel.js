const { Int32 } = require("mongodb");
const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
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
    default: "https://deo.shopeemobile.com/shopee/shopee-edu-live-vn/static/img/Home_Banner.d0b81b4.png",
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
});

const Account = mongoose.model("users", AccountSchema);
module.exports = Account;