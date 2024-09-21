import User from "../models/user.js";
import { Router } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const SecretKey = process.env.JWT_SECRET_KEY;
const login = new Router();

login.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body)
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, SecretKey, { expiresIn: "1h" });
    
    return res.status(200).json({ message: "Login successful", token });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

login.post('/newUser', async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body)
  try {
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    
    return res.status(201).json({ message: "User registered successfully" });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

export default login;
