const { genToken } = require('../utils/genToken');
const User = require('../models/userModel');
const Login = async (req, res, next) => {
    let { email, password } = req.body;
    // console.log(email)
    email?.toLowerCase();
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "user not Exists!" })
        }
        if (!(user && (await user.matchPassword(password)))) {
            return res.status(400).json({ error: "Password invalid! please provide valid password!" });
        } else {
            return res.status(200).json({ message: "Login Successfully!", user, token: genToken(user._id) });
        }
    }
    catch (error) {
        next(error)
    }
}
const Regisister = async (req, res, next) => {
    let { name, email, password, password2, pic } = req.body;
    email?.toLowerCase();
    function validateEmail(elementValue) {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(elementValue);
    }
    if (!(validateEmail(email))) {
        return res.status(400).json({ error: "Email Invalid! Please provide valid Email!" })
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
        return res.status(302).json({ error: "Already exists! please login!" })
    }
    if (!name) {
        return res.status(417).json({ "error": "Name is required!" })
    } if (!email) {
        return res.status(417).json({ "error": "Email is required!" })
    }
    if (!password) {
        return res.status(417).json({ "error": "Password is required!" })
    }
    if (password !== password2) {
        return res.status(417).json({ "error": "Confirm Password Do not matched!" })
    }
    try {
        if (!userExist) {
            const userCreated = await User.create({
                name, email, password, pic
            })
            if (!userCreated) {
                return res.status(400).json({ "error": "Registration failed!" });
            } if (userCreated) {
                return res.status(201).json({ "message": "Registration Successfully!", token: genToken(userCreated._id) });
            }
        }
    }
    catch (error) {
        next(error)
    }
}

//all users
const allUsers = async (req, res, next) => {
    const keyword = req.query.search ? {
        $or: [{ name: { $regex: req.query.search, $options: "i" } },
        { email: { $regex: req.query.search, $options: "i" } }],
    } : {};
    try {
        const users = await User.find(keyword).sort({ createdAt: 1, _id: -1 }).find({ _id: { $ne: req.user._id } })
        return res.status(200).json({ data: users })
    }
    catch (error) {
        next(error)
    }
}

module.exports = { Login, Regisister, allUsers }