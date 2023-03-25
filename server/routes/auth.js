import express from "express";
import { UserModel } from "../models/users.js"
const router = express.Router();
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';



router.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.find({ username })
    const hashedPassword = await bcrypt.hash(password, 10);

    if (user.length === 0) {
        const newUser = new UserModel({ username, password: hashedPassword });
        await newUser.save();
        res.send({ message: 'ok' })
    } else {
        res.send({ message: 'error' })
    }

})


router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username })
    const isValidPassword = await bcrypt.compare(password, user.password)

    if (user && isValidPassword) {
        const token = jwt.sign({ id: user._id }, "secret")
        return res.json({ message: 'username and password is correct', token, userId: user._id })
    } else {
        return res.json({ message: 'username or password is NOT correct' })
    }
})





export { router as authRouter }; 