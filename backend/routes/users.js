import express from "express";
import users from "../models/User.js";
import bcrypt from "bcrypt";


const router = express.Router();

router.post("/register",async (req,res) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);
    
    const newUser = new users({
        username:req.body.username,
        email:req.body.email,
        password:hashedPassword,
    })
    try{
        const savedPin = await newUser.save();
        res.status(200).json(savedPin);
    }catch(err){
        res.status(500).json(err);
    }
})

router.post("/login", async (req,res) => {
    try{
        const user = await users.findOne({ username : req.body.username });
        if (!user){
            res.status(400).json("Wrong username");
        }

        const validPassword = await bcrypt.compare(req.body.password,user.password)
        if (!validPassword){
            res.status(400).json("Wrong username and password");
        }else{
            res.status(200).json("Successfully logged in");
        }

        
    }
    catch (err){
        res.status(500).json(err);
    }
})


export default router;