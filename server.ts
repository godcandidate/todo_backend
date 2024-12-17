import { app } from './app';
import 'dotenv/config';
import connectDB from './utils/db';


// connect server to localhost
app.listen(process.env.PORT, () => {
    console.log(`Server is connected http://localhost:${process.env.PORT}`);
    connectDB();
  });

export {app};