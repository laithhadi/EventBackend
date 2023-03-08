const jwt = require("jsonwebtoken");

exports.generateToken = (userId, username, isAdmin) => {
    const token = {
        userId: userId,
        username: username,
        isAdmin: isAdmin
    };

    const options = {
        expiresIn: process.env.TOKEN_EXPIRY_TIME
    };

    const secret = process.env.TOKEN_SECRET;

    return jwt.sign(token, secret, options);
};

exports.verifyToken = (token) => {
    return jwt.verify(token, process.env.TOKEN_SECRET);
};