import express from 'express'
import { CommentController } from '../controllers/CommentController'
import { checkAuth } from '../middlewares/checkAuth'

const routes = express.Router()

routes.use(checkAuth)

routes.get('/:post_id', CommentController.create)


export default routes