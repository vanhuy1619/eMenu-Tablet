const User = require("../models/User")

async function checkTableFunction(req, res, next) {
    if (!req.session.email) {
        return res.redirect("/user/login")
    }
    else {
        await User.findOne({ email: req.session.email })
            .then(user => {
                if (user.position === 0 || user.position === 2)
                    next()
                else {
                    return res.redirect("/user/table")
                }
            })
    }
}
module.exports = checkTableFunction