const User = require("../models/User")
const Product = require("../models/Product")
const Cart = require("../models/Cart")
const Table = require("../models/Table")
const Order = require("../models/Order")

class OrderController {
    async order(req, res, next) {
        const id = req.params.id
        const email = req.session.email
        let user
        let cart
        let foodOrdered = []
        let bills = []

        let idtable = req.params.id

        await Table.findOne({ id: idtable })
            .then(data => {
                if (data == null || data.status === 'Trống')
                    return res.redirect('/user/table');
            })

        await User.findOne({ email: email })
            .then(u => {
                if (u) {
                    user = u
                }
            })

        await Cart.findOne({ idtable: idtable })
            .then(c => {
                cart = c
            })

        await Order.findOne({ idtable: idtable })
            .then(c => {
                if (c) {
                    for (let i = 0; i < c.listOrder.length; i++) {
                        if (c.listOrder[i].status == 3)
                            bills.push(c.listOrder[i])
                        if (c.listOrder[i].status == 1 || c.listOrder[i].status == 2)
                            foodOrdered.push(c.listOrder[i])
                    }
                }
            })


        await Product.find({toggle: true})
            .then(products => {
                res.render("order", {
                    user: user || null,
                    products: products,
                    cart: cart,
                    idtable: idtable,
                    foodOrdered: foodOrdered || null,
                    bills: bills || null,
                })
            })
    }
}

module.exports = new OrderController()
