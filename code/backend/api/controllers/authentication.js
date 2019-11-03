const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../model/user');
const Network = require('../../network_model/network');
const jwtBlacklist = require('jwt-blacklist')(jwt);

exports.login =  (req, res, next) => {
    if (!req.body.password || !req.body.phone) {
        res.status(401).json({
            message: 'Invalid credentials.'
        });
    }
    User.findOne({email: req.body.phone, deleted: false})
        .exec()
        .then(result => {
            if (!result) {
                res.status(401).json({
                    message: 'Invalid credentials.'
                });
            } else {
                bcrypt.compare(req.body.password, result.password, (error, success) => {
                    if (error || success === false) {
                        res.status(401).json({
                            message: 'Invalid credentials.'
                        });
                    }

                    if (success) {
                        const token = jwt.sign(
                            {
                                phone: result.phone,
                                userId: result._id,
                                role: result.role
                            }
                            , process.env.JWT_SECRET, 
                            {
                                // expiresIn: "1h" //"120" ~ 120ms, "30m" "10h", "2 days", "7d" "1y"
                            }
                        )
                        res.status(200).json({
                            message: 'Success', 
                            token: token,
                            user: {
                                phone: result.phone,
                                userId: result._id,
                                role: result.role
                            }
                        });
                    }
                });
            }
        })
}

exports.logout =  (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    jwtBlacklist.blacklist(token);
    res.status(200).json({
        message: "success"
    })
}

exports.checkIfLoggedIn = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    let decoded = jwt.decode(token);
    res.status(200).json({
        message: "logged in",
        token: token,
        data: decoded
    });
}