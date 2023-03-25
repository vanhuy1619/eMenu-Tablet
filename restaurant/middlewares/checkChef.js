const User = require("../models/User")

async function checkChef(req, res, next) {
    if (!req.session.email)
        return res.redirect("/user/login")
    else {
        await User.findOne({ email: req.session.email })
            .then(user => {
                if (user.position === 1)
                    next()
                else {
                    return res.json({error:3,message:"Không phải phân quyền của bạn"})
                }
            })
    }
}
module.exports = checkChef