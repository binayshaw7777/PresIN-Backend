require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const TOKEN_EXPIRY = "7d";

class userController {

    static userRegistration = async (req, res) => {
        const {name, email, password, phone, isAdmin, role, createdAt, faceEmbeddings, profileAvatar} = req.body;

        try {
          const existingUser = await User.findOne({email: email})
          if (existingUser) {
            return res.status(400).json({ status: 400, message: "Email already exists!" });
          }

          if (!name || !email || !password || !phone || !profileAvatar || !role) {
            return res.status(400).send({ status: 400, message: "All fields are required!"});
          }

          const salt = await bcrypt.genSalt(BCRYPT_SALT)
            const hashedPassword = await bcrypt.hash(password, salt)

            const buffer = Buffer.from(profileAvatar, 'base64')

            const doc = new User({
                name,
                email,
                password: hashedPassword,
                isAdmin,
                role,
                createdAt,
                faceEmbeddings,
                profileAvatar : buffer
            })

            await doc.save()
            const saved_user = await User.findOne({email: email})
            const token = jwt.sign({userID: saved_user._id}, process.env.JWT_SECRET_KEY, {expiresIn: TOKEN_EXPIRY})
            res.status(200).send({ status: 200, message: "User registered successfully!", "token": token});

        } catch (error) {
          console.log(error);
          res.status(400).send({ status: 400, message: `Something went wrong! ${error}`});
        }  
    }

    static userLogin = async (req, res) => {
        try {
          const { email, password } = req.body;
          if (!email || !password) {
            return res.status(400).send({ status: 400, message: "All fields are required!"});
          }

          const user = await User.findOne({ email: email });
          if (!user) {
            return res.status(404).send({ status: 404, message: "You're not a registered user!"});
          }

          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            return res.status(400).send({ status: 400, message: "Invalid email or password!"});
          }

          const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: TOKEN_EXPIRY });
          res.status(200).send({ status: 200, message: "User logged in successfully!", token: token});
            
        } catch (error) {
            console.log(error);
            res.status(400).send({ status: 400, message: "Unable to login!"});
        }
    }

}
module.exports = userController;