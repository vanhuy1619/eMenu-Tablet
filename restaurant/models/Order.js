const mongoose = require('mongoose')
const Schema = mongoose.Schema

//chuyển về phía bếp
const Order = new Schema({
    idtable:String, //bàn order
    totalPrice:Number,
    listOrder: Array, //các món ăn+giá+note
})

module.exports = mongoose.model('Order', Order)

