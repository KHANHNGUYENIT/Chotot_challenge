const jwt = require('jsonwebtoken');
const constants = require('../../constants/common');

module.exports = (req, res, next) => {
    try {
        const token  = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, constants.JWT_SECRET);
        req.userData = decoded;
        next();
    }
    catch(err) {
        res.status(401).json({
            message: "Unauthorized."
        })
    }
}