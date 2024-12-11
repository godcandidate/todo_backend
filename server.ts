import express,  { Request, Response} from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import connectDB from './utils/db';
import todoRouter from './routes/route';



const app = express();


//body parser
app.use(express.json({limit: "50mb"}));

//cookie parser
app.use(cookieParser());

//cors
app.use(cors({
  origin: process.env.ORIGIN
}));

// routes
app.use(
  "/api/v1",
  todoRouter,
);

//testing api
app.use('/test', (req: Request, res:Response) => {
  res.status(200).json({
    success: true,
    message: "API is working"
  });
}); 

// connect server to localhost
app.listen(process.env.PORT, () => {
    console.log(`Server is connected http://localhost:${process.env.PORT}`);
    connectDB();
  });

export {app};