const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('validator');
const userModel = require('../Models/userModel');



const createToken = (_id) => {
    return jwt.sign({ _id }, "secretKey", { expiresIn: "3d" })
}

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: 'Invalid email' });
        }

        if (!validator.isLength(name, { min: 4, max: 30 })) {
            return res.status(400).json({ error: 'Name must be between 4 and 30 characters' });
        }

        if (!validator.isLength(password, { min: 6 })) {
            return res.status(400).json({ error: 'Password must be at least 6 characters long' });
        }

        const result = await userModel.findOne({ email });
        if (result) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        else {
            const hashedPassword = bcrypt.hashSync(password, 10);
            const user = await userModel.create({ name, email, password: hashedPassword });

            const token = createToken(user._id)

            return res.status(200).json({ _id: user._id, name, email, token, password: user.password })
        }
    } catch (error) {
        return res.status(500).json({ msg: "Internal Server Error " + error.message })
    }
}


const login = async (req, res) => {
    const { email, password } = req.body
    try {
        if (!email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: 'Invalid email' });
        }
        if (!validator.isLength(password, { min: 6 })) {
            return res.status(400).json({ error: 'Password must be at least 6 characters long' });
        }
        const user = await userModel.findOne({ email });
        if (user) {
            const validPass = await bcrypt.compare(password, user.password)
            if (validPass) {
                const token = createToken(user._id)
                return res.status(200).json({ user, token, msg: "Login Succesfully" });
            }
            else {
                return res.status(400).json({ error: 'Invalid password' });
            }
        }
        else {
            return res.status(400).json({ error: 'User not found' });
        }

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const getAllUser = async (req, res) => {
    try {
        const users = await userModel.find({})
        return res.status(200).json({ users })
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}



const findUserById = async (req, res) => {
    const { id } = req.params
    try {
        const user = await userModel.findById(id)
        // console.log("USER_ID from request", id)
        // console.log("USER_ID from database", user._id)

        return res.status(200).json({ user: user })
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = { register, login, findUserById, getAllUser }