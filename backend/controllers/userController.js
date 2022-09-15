require('dotenv').config();
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES
    });
};

module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await User.findOne({ email });

        if (!userExist) {
            return res.status(404).json({
                status: 'error',
                error: 'Ther Is No Account Under That Email ...'
            });
        }

        if (!await bcrypt.compare(password, userExist.password)) {
            return res.status(404).json({
                status: 'error',
                error: 'Password Incorrect ...'
            });
        }

        const token = generateToken(userExist.id);

        res.cookie('authToken', token, {
            expiresIn: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
            httpOnly: true
        });

        return res.status(200).json({
            status: 'success',
            data: {
                id: userExist.id
            }
        });

    } catch (err) {
        return res.status(404).json({
            status: 'error',
            error: err.message
        });
    }
}

module.exports.register = async (req, res) => {
    try {
        const { userName, email, password, confirmPassword } = req.body;

        const userExist = await User.findOne({ email }).select('-password');

        if (userExist) {
            return res.status(404).json({
                status: 'error',
                error: 'That Email Is Already Related To An Account ...'
            });
        }

        if (password !== confirmPassword) {
            return res.status(404).json({
                status: 'error',
                error: 'Passwords Do Not Mutch ...'
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            userName, 
            email,
            password: hashedPassword
        });

        if (!newUser) {
            return res.status(404).json({
                status: 'error',
                error: 'Something Wrong With The Creation Of Your Account ...'
            });
        }

        const token = generateToken(newUser.id);

        res.cookie('authToken', token, {
            expiresIn: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
            httpOnly: true
        });

        return res.status(200).json({
            status: 'success',
            data: {
                newUser
            }
        });
    } catch (err) {
        return res.status(404).json({
            status: 'error',
            error: err.message
        });
    }
}

