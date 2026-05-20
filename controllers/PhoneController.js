const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



const registerUser = async (req, res) => {

    try {

        const { name, email, password, brand, phone } = req.body;

        
        const existingUser = await User.findOne({ email });

        if (existingUser) {

            return res.send("User already exists");

        }

        
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email,
            password: hashedPassword,
            brand,
            phone
        });

        await user.save();

        res.send("User registered successfully");

    } catch (err) {

        console.log(err);

    }
};

const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {

            return res.send("User not found");

        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {

            return res.send("Invalid password");

        }
        const token = jwt.sign(
            { id: user._id },
            "secretkey",
            { expiresIn: "1d" }
        );

        res.send({
            message: "Login successful",
            token
        });

    } catch (err) {

        console.log(err);

    }
};


// CREATE
const AddPhone = async(req,res)=>{

    try{

        const user = new User(req.body);

        await user.save();

        res.send(user);

    }catch(err){

        res.send(err)

    }
}


// READ ALL
const getPhones = async(req,res)=>{

    try{

        const user = await User.find();

        res.send(user)

    }catch(err){

        console.log(err)

    }

}


// READ ONE
const getPhonesById = async(req,res)=>{

    try{

        const user = await User.findById(req.params.id);

        res.send(user);

    }catch(err){

        console.log(err)

    }

}


// UPDATE
const updatePhones = async(req,res)=>{

    try{

        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        )

        res.send(user);

    }catch(err){

        console.log(err)

    }

}


// DELETE
const deletePhone = async(req,res)=>{

    try{

        await User.findByIdAndDelete(req.params.id);

        res.send("User deleted");

    }catch(err){

        console.log(err)

    }
}


module.exports = {
    registerUser,
    loginUser,
    AddPhone,
    getPhones,
    getPhonesById,
    updatePhones,
    deletePhone
}