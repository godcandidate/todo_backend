import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import connectDB from './utils/db';



const app = express();


//body parser
app.use(express.json({limit: "50mb"}));

//cookie parser
app.use(cookieParser());

//cors
app.use(cors({
  origin: process.env.ORIGIN
}));


// connect server to localhost
app.listen(process.env.PORT, () => {
    console.log(`Server is connected http://localhost:${process.env.PORT}`);
    connectDB();
  });

export {app};