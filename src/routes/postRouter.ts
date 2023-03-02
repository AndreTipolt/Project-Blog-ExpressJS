import express from 'express'
import { PostController } from '../controllers/PostController'
import { checkAuth } from '../middlewares/checkAuth'

const routes = express.Router()


routes.use(checkAuth)

routes.get('/', checkAuth, PostController.home)



export default routes