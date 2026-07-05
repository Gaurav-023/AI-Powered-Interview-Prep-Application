const User = require("../models/User");
const brcypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Generate JWT Token
const generateToken = (userId) => {
    return jwt.sign({ id: userId}, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// @desc Register a New User
// @route POST /api/auth/register
// @access Public
const registerUser = async(req, res) => {
        try{
            const { name, email, password, profileImageUrl } = req.body;
    
            //Check if the user already exists
            const userExists = await User.findOne({ email });
            if(userExists) {
                return res.status(400).json({ message: "User already exists"})
            }

            //Hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            
        }

}

// @desc Login User
// @route POST /api/auth/login
// @access Public
const loginUser = async(req, res) => {

}

// @desc Get User profile
// @route GET /api/auth/profile
// @access Private (Requires JWT)
const getUserProfile = async (req, res) => {

};

module.exports = { registerUser, loginUser, getUserProfile };

