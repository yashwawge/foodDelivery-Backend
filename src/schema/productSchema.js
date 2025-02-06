const mongoose = require("mongoose");

const productSchema = mongoose.Schema({

     productName:{
        type: String,
        required: [true,"Product name is required"],
        minLength: [5,"Product name must be atleast of 5 charcters"],
        trim: true
     },
     description:{
        type: String,
        minLength: [5,"Product name must be atleast of 5 charcters"]
     },
     productImage: {
        type: String
     },
     Price: {
        required: [true,"Price is required"],
        type: Number
     },
     category: {
        type: String,
        enum: ['veg','non-veg','drinks','sides'],
        default: 'veg'
     },
     inStock:{
        type: Boolean,
        required: [true,"In stock status is required"],
        default: true
     }
},{
    timestamps: true
});

const Product = mongoose.model('Product',productSchema);
module.exports = Product;