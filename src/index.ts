import 'dotenv/config'
import express, { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { engine } from 'express-handlebars'

import userRouter from './routes/userRouter'
import postRouter from './routes/postRouter'
import commentRouter from './routes/commentRouter'
import session from 'express-session';


const app = express()

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

app.use(express.static('src/public'))

app.engine('handlebars', engine())
app.set('view engine', 'handlebars');
app.set('views', 'src/views');


AppDataSource.initialize().then(() => {
    app.use(session({
        secret: process.env.SECRET ?? '',
        resave: false,
        saveUninitialized: false,
        cookie: { secure: true }
      }))
    app.use('/user', userRouter)

    app.use('/post', postRouter)

    app.use('/comment', commentRouter)

    app.listen(process.env.PORT)
})



