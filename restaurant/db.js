const mongoose = require('mongoose')

async function connect() {
    try {
        await mongoose.connect(process.env.db)
        console.log('connect to MongoDB successfully')
    }
    catch (err) {
        console.log("connection to MongoDB failed")
        console.log(err)
    }
}

module.exports = { connect }
