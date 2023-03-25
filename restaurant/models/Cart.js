const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Giở hàng của bàn đang mở
const Cart = new Schema({
    email_staff: String,
    idtable:String,
    totalPrice: Number,
    product: Array,
    createAt: String
})

module.exports = mongoose.model('Cart', Cart)

