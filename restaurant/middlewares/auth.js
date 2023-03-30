const express = require('express'),
jwt    = require('jsonwebtoken'),
config = require('../config/config'),
app = express(); 

//set secret
app.set('Secret', config.secret);

async function auth(req, res, next) {
    var token = req.headers['access-token'];

    if (token) {
        jwt.verify(token, app.get('Secret'), (err, decoded) => {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                req.decoded = decoded;
                next();
            }
        });

    } else {
        return res.status(403).send({
            message: 'No token provided.'
        });

    }
}

module.exports = auth
