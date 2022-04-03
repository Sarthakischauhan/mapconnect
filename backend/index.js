import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import pinRouter from "./routes/pin.js"
import userRouter from "./routes/users.js"

const app = express();
dotenv.config();


app.use(express.json())

mongoose.connect(`mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.kgfxb.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`,{ useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("Mongo db was connected ")
})
.catch((err) => {
    console.log(err);
})

app.listen(8800,() => {
    console.log("The app is running");
})

app.use("/api/pin",pinRouter);
app.use("/api/user",userRouter);