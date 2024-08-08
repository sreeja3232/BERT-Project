const userModel = require("../models/userModel");  //userModel is collection
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//register
const registerController = async (req, res) => {
    try {
        const existingUser = await userModel.findOne({ email: req.body.email })
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: 'User already exists',
            })
        }

        // validate the password
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        if (!passwordRegex.test(req.body.password)) {
            return res.status(400).send({
                success: false,
                message: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
            });
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword

        //rest data
        const user = new userModel(req.body)
        await user.save()
        return res.status(201).send({
            success: true,
            message: 'User Registered Successfully',
            user,
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Register API',
            error,
        })
    }
}

//login 
const loginController = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            })
        }
        //compare password
        const comparePassword = await bcrypt.compare(req.body.password, user.password);
        if (!comparePassword) {
            return res.status(500).send({
                success: false,
                message: "Invalid credentials"
            })
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        return res.status(200).send({
            success: true,
            message: "Login Successful",
            token,
            user
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "error in login api",
            error

        })

    }


}

module.exports = {
    registerController,
    loginController,
};

