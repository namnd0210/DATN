import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'

import postRouter from './routes/posts'
import user from './routes/user'
dotenv.config()

const port = process.env.PORT || 5000
const app = express()
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/posts', postRouter)

// api
app.use('/api/user', user)

// connect db
mongoose
  .connect(process.env.MONGOURL, {
    useUnifiedTopology: true
  })
  .then(() => console.log('Mongodb connected !!!'))
  .catch((err) => console.log(err))

app.listen(port, () => console.log(`Server running on ${port}`))
