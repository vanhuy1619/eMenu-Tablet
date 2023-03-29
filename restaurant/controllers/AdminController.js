const { response } = require("express");
const Bill = require("../models/Bill");
const User = require("../models/User");

class AdminController {
    async admin(req, res) {
        let userObj;

        await User.find({ position: { $ne: 0 } }).then((users) => {
            userObj = users;
        });

        // console.log(userObj);

        await User.findOne({ email: req.session.email }).then((user) =>
            res.render("admin", {
                users: userObj,
                admin: user,
            })
        );
    }

    async getBillByDate(req, res) {
        let date = req.params.date
        let day = date.replaceAll("-","/")

        await Bill.find({ timePay: { $regex: day } })
            .then(bills => {
                res.json({ code: 0, data: bills})
        })
    }
}

module.exports = new AdminController();