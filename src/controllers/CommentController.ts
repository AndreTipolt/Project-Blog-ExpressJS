import { Request, Response } from "express";
import { transformeDate } from "../middlewares/transformeDate";
import { Post } from "../models/Post";
import { commentRepository } from "../repositories/CommentRepository";
import { postRepository } from "../repositories/PostRepository";

export class CommentController {
    static async create(req: Request, res: Response) {
        const postId = req.params.post_id
        const { content } = req.body

        if (!content) {
            return res.status(400).redirect(`/post/${postId}`)
        }
        const post = await postRepository.findOneBy({ id: Number(postId) })

        if (!post) {
            return res.status(400).json('Unexpected Post')
        }

        const dateComment = new Date()
        const newComment = await commentRepository.create({ content, date: dateComment, user: req.user, post })

        await commentRepository.save(newComment)

        return res.status(201).redirect(`/post/${postId}`)

    }

    static async showComments(postId: Number) {


        const post = await postRepository.findOneBy({ id: Number(postId) })

        if (!post) {
            return 'Unexpected Post'
        }

        const comments = await (await commentRepository.find({
            where: { post },
            relations: { user: true }
        })).map((comment) => {
            comment.user.password = ''

            const diffHour = transformeDate(comment.date)

            return { comment, diffHour }
        })
        
        return comments
    }
}