import express, { Router } from "express"
import { UserController } from "../controllers/UserController"


const routes = express.Router()



routes.get('/', UserController.getcreateUser)
routes.post('/create', UserController.createUser)


export default routes