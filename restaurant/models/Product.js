const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Product = new Schema({
    id: { type: String, unique: true, require: true },
    cloudinary_id: String,
    name: String,
    image: String,
    price: Number,
    oldPrice: Number,
    type: Number,
    //1: khai vị, 2:salad, 3: thịt bò, 4: Hải sản, 5: Các loại thịt, 6: Pasta, 7:Lẩu
    customerCare: String,
    createdAt: String
})

module.exports = mongoose.model('Product', Product)

