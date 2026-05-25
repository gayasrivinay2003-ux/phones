const User = require('../model/User');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');


// ================= REGISTER =================

const registerUser = async (req, res) => {

    try {

        const {
            name,
            email,
            password,
            brand,
            phone
        } = req.body;

        // Check Existing User
        const existingUser =
            await User.findOne({ email });

        if (existingUser) {

            return res.json({
                message: "User already exists"
            });

        }

        // Hash Password
        const hashedPassword =
            await bcrypt.hash(password, 10);

        // Create User
        const user = new User({

            name,
            email,
            password: hashedPassword,
            brand,
            phone

        });

        await user.save();

        res.json({
            message:
                "User registered successfully"
        });

    } catch (err) {

        console.log(err);

        res.json({
            message: "Server Error"
        });

    }
};


// ================= LOGIN =================

const loginUser = async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;

        // Find User
        const user =
            await User.findOne({ email });

        if (!user) {

            return res.json({
                message: "User not found"
            });

        }

        // Compare Password
        const isMatch =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!isMatch) {

            return res.json({
                message: "Invalid password"
            });

        }

        // Create Token
        const token = jwt.sign(

            { id: user._id },

            "secretkey",

            { expiresIn: "1d" }

        );

        res.json({

            message: "Login successful",

            token

        });

    } catch (err) {

        console.log(err);

        res.json({
            message: "Server Error"
        });

    }
};


// ================= CREATE PHONE =================

const AddPhone = async (req, res) => {

    try {

        const user =
            new User(req.body);

        await user.save();

        res.json(user);

    } catch (err) {

        console.log(err);

        res.json({
            message: "Error adding phone"
        });

    }
};


// ================= READ ALL =================

const getPhones = async (req, res) => {

    try {

        const user =
            await User.find();

        res.json(user);

    } catch (err) {

        console.log(err);

        res.json({
            message: "Error fetching phones"
        });

    }
};


// ================= READ ONE =================

const getPhonesById = async (req, res) => {

    try {

        const user =
            await User.findById(
                req.params.id
            );

        res.json(user);

    } catch (err) {

        console.log(err);

        res.json({
            message: "Error fetching phone"
        });

    }
};


// ================= UPDATE =================

const updatePhones = async (req, res) => {

    try {

        const user =
            await User.findByIdAndUpdate(

                req.params.id,

                req.body,

                { new: true }

            );

        res.json(user);

    } catch (err) {

        console.log(err);

        res.json({
            message: "Error updating phone"
        });

    }
};


// ================= DELETE =================

const deletePhone = async (req, res) => {

    try {

        await User.findByIdAndDelete(
            req.params.id
        );

        res.json({
            message: "User deleted"
        });

    } catch (err) {

        console.log(err);

        res.json({
            message: "Error deleting phone"
        });

    }
};


module.exports = {

    registerUser,

    loginUser,

    AddPhone,

    getPhones,

    getPhonesById,

    updatePhones,

    deletePhone

};