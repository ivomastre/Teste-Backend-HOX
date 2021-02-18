const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const secret = require("../config/auth.config.js");
const User = require('../models/user.js')

module.exports = {
    async register(req, res) {
        const { name, email, password } = req.body
        const user_response = await User.create(
            { 
                name, email, password: bcrypt.hashSync(password, 8)
            }
        );


        return res.json(user_response)
    },



    async login(req, res) {
        const { email , password } = req.body
        if(!email||!password){
            return res.status(400).send({ message: "Email or password not provided."})
        }
        const user_response = await User.findOne({ 
           where: { email }
        })
        if (!user_response) {
            return res.status(404).send({ message: "User Not found." });
        }


        const passwordIsValid = bcrypt.compareSync(
            password,
            user_response.password
        );
        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }

        const token = jwt.sign({ id: user_response.id }, secret, {
            expiresIn: 86400 // 24 hours
        })
        
        return res.status(200).send({
            id: user_response.id,
            name: user_response.name,
            email: user_response.email,
            token
        })
    }
}