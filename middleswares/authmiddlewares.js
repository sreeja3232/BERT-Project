const JWT = require('jsonwebtoken');
const userModel = require('../models/userModel');

exports.requireSignIn = async (req, res, next) => {
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = decode;
        next();

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token has expired',
            });
        }
        else {
            console.error(error);
            return res.status(401).json({
                success: false,
                message: 'Invalid token',
            });
        }
    }
}


exports.isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user.userId);
        if (user.role !== 1) {
            return res.status(401).send({
                success: true,
                message: "Unauthorized access",
            })
        }
        else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            error,
            message: "Error in admin middleware",
        })
    }
}