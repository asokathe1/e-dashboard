const mongoose= require("mongoose");

const productSchema = new mongoose.Schema({

    name :String,
    price:String,
    userid:String,
    category:String,
    brand:String
});

module.exports = mongoose.model("product",productSchema);