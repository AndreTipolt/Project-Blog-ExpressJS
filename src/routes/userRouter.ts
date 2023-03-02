import express, { Router } from "express"
import { UserController } from "../controllers/UserController"


const routes = express.Router()



routes.get('/', UserController.getCreateUser)
routes.post('/create', UserController.createUser)
routes.get('/login', UserController.getLogin)
routes.post('/login', UserController.login)


export default routes