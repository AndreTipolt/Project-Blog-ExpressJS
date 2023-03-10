import express from 'express'
import { PostController } from '../controllers/PostController'
import { checkAuth } from '../middlewares/checkAuth'

const routes = express.Router()


routes.use(checkAuth)

routes.get('/', PostController.home)
routes.get('/create', PostController.getCreate)
routes.post('/create', PostController.create)
routes.get('/:id', PostController.viewPost)



export default routes