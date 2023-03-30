const express = require('express'),
jwt    = require('jsonwebtoken'),
config = require('../config/config')
app = express(); 

app.set('Secret', config.secret);
class AuthController {
    async getToken(req, res) {
        if (req.body.username === "admin") {
            if (req.body.password === "123456") {
                const payload = {
                    check: true
                };

                var token = jwt.sign(payload, app.get('Secret'), {
                    expiresIn: 1440 // expires in 24 hours
                });

                // return the informations to the client
                res.json({
                    message: 'authentication done ',
                    token: token
                });

            } else {
                res.json({ message: "please check your password !" })
            }

        } else {
            res.json({ message: "user not found !" })
        }
    }
}

module.exports = new AuthController()