import mongoose from "mongoose";
import express from "express";
import cors from 'cors';
import { authRouter } from './routes/auth.js';
import { RecipeRouter } from "./routes/recipes.js";
import dotenv from 'dotenv';

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());


app.use("/auth", authRouter)
app.use("/recipes", RecipeRouter)


mongoose.connect(process.env.MONGO_URI).then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running at port ${process.env.PORT}`)
    })
}) 
