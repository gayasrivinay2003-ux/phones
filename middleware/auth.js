const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {

    try {

        const token = req.header("Authorization");

        if (!token) {

            return res.send("Access denied");

        }
        const verified = jwt.verify(token, "secretkey");
        req.user = verified.id;

        next();

    } catch (err) {

        res.send("Invalid token");

    }

}

module.exports = auth;