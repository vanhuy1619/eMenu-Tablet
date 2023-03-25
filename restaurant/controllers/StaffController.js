const { validationResult } = require('express-validator')
const Table = require('../models/Table')
const User = require("../models/User")
const Cart = require("../models/Cart")

let url = require('url')
const { log } = require('console')
const { response } = require('express')

class StaffController {
    login(req, res) {
        res.render('login')
    }

    checkLogin(req, res) {
        let { email, password } = req.body

        User.findOne({ email: email }, function (err, user) {
            let error
            if (user === null) {
                err = "Tài khoản đăng nhập không hợp lệ"
            }
            else {
                if (user.validPassword(password)) {
                    req.session.email = user.email
                    res.json({
                        code: 0,
                        message: "Đăng nhập thành công"
                    })
                }
                else {
                    error = "Tài khoản đăng nhập không hợp lệ"
                }
            }

            if (error) {
                res.json({
                    code: 1,
                    message: error
                })
            }
        })
    }

    async getTable(req, res) {
        const email = req.session.email || ""
        let user

        await User.findOne({ email: email })
            .then(u => user = u)

        await Table.find({})
            .then(tables => {
                res.render("table", {
                    user: user || null,
                    tables: tables,
                })
            })
    }

    async openTable(req, res) {
        const email = req.session.email
        let user

        if (!req.session.email)
            return res.json({ code: 2, message: "Vui lòng đăng nhập!" })

        const data = req.body
        const { idtable, status } = data

        // console.log(data);

        let openNewCartJson = {
            email_staff: req.session.email,
            idtable: idtable,
            totalPrice: 0,
            product: [],
            createAt: new Date().toLocaleString()
        }

        let newCart = new Cart(openNewCartJson)

        await newCart.save()

        await Table.updateOne({ id: idtable }, { status: status })
            .then(() => {
                return res.json({
                    code: 0,
                    message: 'Mở bàn thành công',
                })
            })
            .catch(err => res.json({ code: 1, error: err }))
    }
}
module.exports = new StaffController()