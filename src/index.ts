import 'dotenv/config'
import express, { Request, Response } from "express"
import { AppDataSource } from "./data-source"

import userRouter from './routes/userRouter'
import postRouter from './routes/postRouter'

const app = express()

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

app.use(express.static('src/public'))


AppDataSource.initialize().then(() => {

    app.get('/', (req: Request, res: Response) => {
        res.status(200).json('Initial Page')
    })
    app.use('/user', userRouter)

    app.use('/post', postRouter)

    app.listen(process.env.PORT)
})



