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
        saveUninitialized: true,
        cookie: { maxAge: 3000000 }
      }))
    app.use('/user', userRouter)

    app.use('/post', postRouter)

    app.use('/comment', commentRouter)

    app.get('/', (req, res) =>{
      return res.redirect('/post')
    })

    app.get('/exit', (req: Request, res: Response) =>{
       
      res.clearCookie('token')
      return res.redirect('/user/login')
    })

    app.listen(process.env.PORT)
})



