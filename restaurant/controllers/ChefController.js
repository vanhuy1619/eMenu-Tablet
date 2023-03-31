const Order = require("../models/Order")
const Product = require("../models/Product")
const User = require("../models/User")

class ChefController {
    async getChef(req, res) {
        await User.findOne({ email: req.session.email })
            .then(async (user) => {
                if (user) {
                    await Order.find({})
                        .then(orders => {
                            orders.forEach(ele => {
                                ele.listOrder.sort(function (a, b) {
                                    return b.idZone - a.idZone
                                })
                            }),
                                res.render('chef', {
                                    chef: user,
                                    orders: orders
                                })
                        })
                }
            })
    }

    async getProducts(req, res) {
        await Product.find({})
            .then((data) => res.json({ code: 0, products: data }))
            .catch(error => res.json({ code: 1, message: error }))
    }

    async updateOrderStatus(req, res) {
        const data = req.body //{idtable, _id, product_id, iditem, amountEdit, status}

        console.log(data);

        if (!req.session.email)
            return res.json({ code: 2, message: "Vui lòng đăng nhập" })

        //Nếu hủy
        if (data.status == 0) {
            await Order.updateOne({ idtable: data.idtable, _id: data._id },
                { $pull: { listOrder: { product_id: data.product_id }, listOrder: { idZone: data.idZone } }, $inc: { totalPrice: - (data.price * data.amountEdit) } })
                .then(() => {
                    return res.json({ code: 0, message: "Hủy món thành công" })
                })
                .catch(() => {
                    return res.json({ code: 1, message: "Hủy món thất bại" })
                })
        }

        else {
            await Order.updateOne(
                { idtable: data.idtable, _id: data._id, "listOrder.product_id": data.product_id, "listOrder.idZone": data.idZone },
                { $set: { "listOrder.$[element].status": data.status, "listOrder.$[element].amount": data.amountEdit } },
                { arrayFilters: [{ "element.product_id": data.product_id, "element.idZone": data.idZone }] })
                .then(() => res.json({ code: 0, message: "Cập nhật thành công" }))
                .catch(err => res.json({ code: 1, message: "Thất bại" }))

            let totalPriceUpdate = 0
            await Order.findOne({ idtable: data.idtable, _id: data._id })
                .then((c) => {
                    c.listOrder.forEach(ele => {
                        console.log(ele.amount * ele.price);
                        totalPriceUpdate = totalPriceUpdate + ele.amount * ele.price;
                    })
                })

            await Order.updateOne({ idtable: data.idtable, _id: data._id }, { totalPrice: totalPriceUpdate })
        }
    }

    async updateToggleFood(req, res) {
        let data = req.body
        await Product.findOneAndUpdate({ id: data.id }, { toggle: data.toggle })
            .then((data) => {
                if (data != null)
                    res.json({ code: 0, message: 'Cập nhật trạng thái món ăn thành công' })
                else
                    res.json({ code: 0, message: 'MÃ id sai' })
            })
            .catch(err => res.json({ code: 0, message: 'Cập nhật trạng thái món ăn thất bại' }))
    }
}
module.exports = new ChefController()