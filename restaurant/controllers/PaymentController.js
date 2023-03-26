const Product = require("../models/Product")
const Cart = require("../models/Cart")
const Order = require("../models/Order")
const User = require("../models/User")
const Bill = require("../models/Bill")
const Table = require("../models/Table")

class PaymenController {
    async payment(req, res) {
        const id = req.params.id

        if (!req.session.email) {
            return res.json({ code: 2, message: "Vui lòng đăng nhập" })
        }

        else if (!id)
            return res.json({ code: 1, message: "Sai id" })

        else {
            await Product.findOne({ id: id })
                .then(product => {
                    return res.json({ code: 0, message: "success", product: product })
                })
        }
    }

    async addcart(req, res) {
        if (!req.session.email)
            return res.json({ code: 2, message: "Vui lòng đăng nhập" })

        const cart = req.body

        let price = 0
        let totalPrice = 0

        // console.log(cart);

        await Product.findOne({ id: cart.product_id })
            .then(product => {
                if (product) {
                    cart.productInfo = product //lấy thông tin sản phẩm
                    price += product.price //lấy giá sản phẩm

                }
            })
            .catch(err => res.json({ code: 2, message: err.message }))

        price = price * cart.amount

        await Cart.findOne({ idtable: cart.idtable })
            .then(async data => {
                const cartProduct = data.product //lấy product trong database cart
                cartProduct.push(cart) //push cart chỗ req.body

                //tính tổng tiền
                cartProduct.forEach(ele => {
                    totalPrice += ele.price * ele.amount
                })

                //Cập nhật
                await Cart.updateOne({ idtable: cart.idtable }, {
                    totalPrice: totalPrice,
                    product: cartProduct
                })
                    .then(() => res.json({ code: 0, message: "Thêm sản phẩm thành công" }))
                    .catch(err => res.json({ code: 1, message: err.message }))
            })
            .catch(err => res.json({ code: 2, message: err.message }))
    }

    async deleteProductFromCart(req, res) {
        if (!req.session.email)
            return res.json({ code: 2, message: 'Vui lòng đăng nhập' })

        const item = req.body

        if (!item.idproduct)
            return res.json({ code: 1, message: 'Id sai' })

        await Cart.findOne({ idtable: item.idtable })
            .then(async carts => {
                for (let i = 0; i < carts.product.length; i++) {
                    if (item.idproduct === carts.product[i].product_id) {
                        carts.totalPrice -= (carts.product[i].amount * carts.product[i].price)
                        carts.product.splice(i, 1)
                        break
                    }
                }
                //Cập nhật lại danh sách product và tổng giá
                await Cart.updateOne({ idtable: item.idtable }, { product: carts.product, totalPrice: carts.totalPrice })
                    .then(() => res.json({ code: 0, message: "success", totalPrice: carts.totalPrice }))
                    .catch(err => res.json({ code: 1, message: err.message }))

            })
    }

    async deleteCart(req, res) {
        if (!req.session.email)
            return res.json({ code: 2, message: "Vui lòng đăng nhập!" })

        const idtable = req.params.id

        await Cart.updateOne({ idtable: idtable }, { product: [], totalPrice: 0 })
            .then(() => res.json({ code: 0, message: "Xóa giỏ thành công" }))
            .catch(err => res.json({ code: 1, message: err.message }))
    }

    async confirmOrder(req, res) {
        if (!req.session.email)
            return res.json({ code: 2, message: "Vui lòng đăng nhập!" })

        let idtable = req.params.idtable

        await Cart.findOne({ idtable: idtable })
            .then(async cart => {
                if (cart) {
                    await Cart.updateOne({ idtable: idtable }, { product: [], totalPrice: 0 })

                    //Thêm thuộc tính

                    let cartEdit = []


                    for (var i = 0; i < cart.product.length; i++) {
                        let cartItem = cart.product[i];
                        cartItem.status = 1 //'Chờ xác nhận',
                        cartItem.timeOrder = new Date().toLocaleString(),
                            cartItem.email_staff = req.session.email //email nhân viên xác nhận order

                        cartEdit.push(cartItem)
                    }

                    let orderObj = {
                        idtable: idtable,
                        totalPrice: cart.totalPrice,
                        listOrder: cartEdit,
                    }

                    // console.log(cartEdit);

                    await Order.findOne({ idtable: idtable })
                        .then(order => {
                            if (order) {
                                let updateTotalPrice = 0

                                for (let i = 0; i < cart.product.length; i++) {
                                    order.listOrder.push(cart.product[i])
                                    updateTotalPrice = updateTotalPrice + cart.product[i].price * cart.product[i].amount
                                }

                                var updateListOrder = order.listOrder

                                updateListOrder.status = 1 //"Chờ xác nhận"
                                updateListOrder.timeOrder = new Date().toLocaleString()
                                updateListOrder.email_staff = req.session.email

                                Order.updateOne({ idtable: idtable }, { listOrder: updateListOrder, $inc: { totalPrice: updateTotalPrice } })
                                    .then(() => res.json({ code: 0, message: "Xác nhận order" }))
                            }
                            else {
                                const newOrder = new Order(orderObj)
                                newOrder.save()
                                res.json({ code: 0, message: "Xác nhận order" })
                            }
                        })
                        .catch(err => res.json({ code: 1, message: "Order thất bại" }))
                }
            })

    }

    async confirmPay(req, res) {
        if (!req.session.email)
            return res.json({ code: 2, message: "Vui lòng đăng nhập!" })

        let idtable = req.params.idtable
        let listOrder

        await Order.findOne({ idtable: idtable })
            .then((order) => {
                listOrder = order.listOrder
            })

        let billObj = {
            emailStaffPay: req.session.email,
            idtable: idtable,
            timeZone: Date.now(),
            timePay: new Date().toLocaleString(),
            listOrder: listOrder,
        }

        const newBill = new Bill(billObj)
        newBill.save()

        await Order.deleteOne({ idtable: idtable })
        await Table.updateOne({ id: idtable }, { status: 'Trống' })
        await Cart.deleteOne({ idtable: idtable })
            .then(() => res.json({ code: 0, message: "Thanh toán thành công" }))

    }


}

module.exports = new PaymenController()