import 'dotenv/config'
import express, { Request, Response } from "express"
// import handlebars from 'express-handlebars'
import { AppDataSource } from "./data-source"

import userRouter from './routes/userRouter'

const app = express()



// app.engine('handlebars', handlebars.engine())
// app.set('view engine', 'handlebars');

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

app.use(express.static('public'))


AppDataSource.initialize().then(() => {

    app.get('/', (req: Request, res: Response) => {
        res.json('Initial Page')
    })
    app.use('/user', userRouter)

    app.listen(process.env.PORT)
})



