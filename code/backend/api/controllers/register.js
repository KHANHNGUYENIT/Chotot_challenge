const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../../models/user');
const SaltRounds= 10;
exports.register = (req, res, next) => {
    if (!req.body.password) {
        res.status(500).json({
            message: "Password is required."
        })
    }
    
    return User.findOne({phone: req.body.phone, deleted: false})
        .exec()
        .then(user => {
            if (user) {
                res.status(409).json({
                    message: "phone exists."
                })
            } else {
                let createdDate = new Date();
                let id = new mongoose.Types.ObjectId();
                req.body['id'] = id;
                req.body['createdAt'] = createdDate;
                 // Insert Authentication database
                bcrypt.hash(req.body.password, SaltRounds, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            message: err
                        });
                    } else {
                        let user = new User({
                            _id: id,
                            phone: req.body.phone,
                            role: req.body.role,
                            password: hash,
                            created_at: createdDate
                        });
            
                        user
                            .save()
                            .then(result => {
                                res.status(200).json({
                                    message: "Success"
                                });
                            })
                            .catch(err => {
                                res.status(500).json({
                                    message: err.errmsg
                                })
                            });
                    }
                })
            }
        })
}