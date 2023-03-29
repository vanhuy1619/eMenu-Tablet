const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Bill = new Schema({
    emailStaffPay:String,
    idtable:String,
    timeZone:String,
    timePay:String,
    totalPrice:Number,
    listOrder:Array
    
})

module.exports = mongoose.model('Bill',Bill)