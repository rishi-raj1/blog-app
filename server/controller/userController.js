import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

import User from "../models/userModel.js";


export const signupUser = async (req, res) => {
    try {
        // ckecking if that user already exist or not if exist then sent error that username already exist please 
        // change the username

        let username = req.body.username;
        username = username.trim();

        const users = await User.find({ username });
        // console.log(users);

        if (users.length > 0) {
            return res.status(409).json({ msg: 'change the username!' });
        }

        // if username not exist the go to below and create  a new user

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const user = {
            username: req.body.username,
            name: req.body.name,
            password: hashedPassword
        }


        const newUser = new User(user);
        await newUser.save();

        return res.status(200).json({ msg: 'Signup successfull' });
    } catch (error) {
        return res.status(500).json({ msg: 'Error while signup the user' });

    }
}


export const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (user) {
            const match = await bcrypt.compare(req.body.password, user.password);


            if (match) {
                const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn: '1h' });


                return res.status(200).json({ accessToken, name: user.name, username: user.username });

            }
            else {
                return res.status(400).json({ msg: 'Password does not match' });
            }
        }
        else {
            return res.status(400).json({ msg: 'Username does not match' });
        }
    } catch (error) {
        return res.status(500).json({ msg: 'Error while login the user' });
    }
}