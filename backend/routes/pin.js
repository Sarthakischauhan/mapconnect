import express from "express";
import pins from "../models/Pin.js";

const router = express.Router();

router.post("/", async (req,res) => {
    const newPin = new pins(req.body);
    try{
        const savedPin = await newPin.save();
        res.status(200).json(savedPin);
    }
    catch (err) {
        res.status(500).json(err);
    }
})

router.get("/",async (req,res) => {
    try{
        const allPins = await pins.find();
        res.status(200).json(allPins);
    }
    catch (err){
        res.status(500).json(err);
    }
})

export default router;