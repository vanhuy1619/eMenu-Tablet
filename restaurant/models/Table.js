const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Table = new Schema({
    id: { type: String, unique: true, require: true },
    name: String,
    status:String,
    createdAt: String
})

module.exports = mongoose.model('Table', Table)

