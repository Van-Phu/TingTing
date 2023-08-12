const { Double } = require("mongodb");
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
        productName: {
            type: String,
            require: true
        },
        idCollab: {
            type: String,
            require: true,
            ref: 'users'
        },
        productAvatar: {
            type: String,
            require: true,
            default: "https://ecohealthinstitute.websites.co.in/dummytemplate/img/product-placeholder.png"
        },
        price: {
            type: Number,
            require: true,
            validate: {
                validator: function (v) {
                  return v > 0;
                },
                message: 'Giá sản phẩm phải lớn hơn 0!!',
              },
        },
        describe: {
            type: String
        },
        productImage: {
            type: Array,
            default: ["https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"]
        },
        type:{
            type: String,
            require: true,
            default: "unknown"
        },
        status:{
            type: Number, 
            require: true,
            default: 0
        },
        priceSale:{
            type:Number,
            default: 0,
            validate: {
                validator: function (v) {
                  return v >= 0;
                },
                message: 'Giá sản sale phải lớn hơn hoặc bằng 0!!',
              },
        }
});

const Product = mongoose.model("products", ProductSchema);

module.exports = Product;