import User from "../models/user.model.js";
import asyncHandler from "express-async-handler";
import { generateJWTtoken } from "../utils/generateJWT.util.js";

const registerUser = asyncHandler(async (req, res) => {
    const { phone_number, priority } = req.body;
  
    // Checking if the phone number is already registered
    const existingUser = await User.findOne({ phone_number });
    if (existingUser) {
      res.status(400).json({ message: 'Phone number already registered' });
      return;
    }
  
    const newUser = new User({ phone_number, priority });
  
    try {
      await newUser.save();
      const token = generateJWTtoken(newUser._id); 
      res.status(201).json({ message: 'User registered successfully', user: newUser, token });
    } catch (error) {
      res.status(500).json({ message: 'Failed to register user', error: error.message });
    }
  });
  
  export { registerUser };
