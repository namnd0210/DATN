import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

import classRouter from './routes/class';
import userRouter from './routes/user';
dotenv.config();

const port = process.env.PORT || 5000;
const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// api
app.use('/api/user', userRouter);
app.use('/api/class', classRouter);

// connect db
mongoose
  .connect(process.env.MONGOURL, {
    useUnifiedTopology: true,
  })
  .then(() => console.log('Mongodb connected !!!'))
  .catch((err) => console.log(err));

app.listen(port, () => console.log(`Server running on ${port}`));
