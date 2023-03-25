const Order = require("../models/Order")
const User = require("../models/User")

class ChefController {
    async getChef(req, res) {
        await User.findOne({ email: req.session.email })
            .then(async (user) => {
                if (user) {
                    await Order.find({})
                        .then(orders => res.render('chef', {
                            chef: user,
                            orders: orders
                        }))
                }
            })
    }

    async updateOrderStatus(req, res) {
        const data = req.body //{idtable, _id, product_id, iditem, amountEdit, status}

        // console.log(data);

        if (!req.session.email)
            return res.json({ code: 2, message: "Vui lòng đăng nhập" })

        let totalPricePre, amountPre
        await Order.findOne({ idtable: data.idtable, _id: data._id })
        .then( (c) => {
            totalPricePre =  c.totalPrice
            c.listOrder.forEach(ele=>{
                if(ele.product_id === data.product_id){
                    amountPre
                }
            })
        })

        console.log(totalPricePre);

        //Nếu hủy
        if (data.status == 0) {
            await Order.updateOne({ idtable: data.idtable, _id: data._id },
                { $pull: { listOrder: { product_id: data.product_id }}, totalPrice: totalPricePre - data.price * data.amountEdit })
                .then(() => res.json({ code: 0, message: "Hủy món thành công" }))
        }

        if (data.amountEdit == 0) {
            await Order.updateOne({ idtable: data.idtable, _id: data._id },
                { $pull: { listOrder: { product_id: data.product_id }}, totalPrice: totalPricePre - data.price * data.amountEdit })
                .then(() => res.json({ code: 0, message: "Hủy món thành công" }))
        }

        else {
            await Order.updateOne(
                { idtable: data.idtable, _id: data._id, "listOrder.product_id": data.product_id },
                { $set: { "listOrder.$[element].status": data.status, "listOrder.$[element].amount": data.amountEdit } },
                { arrayFilters: [{ "element.product_id": data.product_id }] })
                .then(() => res.json({ code: 0, message: "Cập nhật thành công" }))
                .catch(err => res.json({ code: 1, message: "Thất bại" }))
        }
    }
}
module.exports = new ChefController()