import express from 'express';
import 'dotenv/config';
import { connectDB } from './Database/connectDB.js';
import login from './Routes/Login.js';
import cors from 'cors';
const app = express();

const PORT = process.env.PORT || 3000;
const url = process.env.MONGODB_URL

connectDB(url)
app.use(express.json())
app.use(cors());

app.use((req, res, next) => {
    console.log("Request Body:", req.body); // Log request body
    next();
  });
  
app.use('/api/v1',login)

app.listen(PORT,(req,res)=>{
console.log(`Listening on port ${PORT}`);

})
