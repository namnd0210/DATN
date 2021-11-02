import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import passport from 'passport';

import newLocal from './config/passport';
import categoryRouter from './routes/category';
import classRouter from './routes/class';
import questionRouter from './routes/question';
import userRouter from './routes/user';

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// passport
app.use(session({ secret: 'secret' }));
app.use(passport.initialize());
app.use(passport.session());

// api
app.use('/api/user', userRouter);
app.use('/api/class', classRouter);
app.use('/api/category', categoryRouter);
app.use('/api/question', questionRouter);

// connect db
mongoose
  .connect(process.env.MONGOURL, {
    useUnifiedTopology: true,
  })
  .then(() => console.log('Mongodb connected !!!'))
  .catch((err) => console.log(err));

// passport config
newLocal(passport);

app.listen(port, () => console.log(`Server running on ${port}`));
