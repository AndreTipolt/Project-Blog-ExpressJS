import { Request, Response } from "express";
import { postRepository } from "../repositories/PostRepository";
import { date, z } from 'zod'
import { Like } from 'typeorm'
import { commentRepository } from "../repositories/CommentRepository";
import { CommentController } from "./CommentController";
import { transformeDate } from "../middlewares/transformeDate";

export class PostController {

    static async getCreate(req: Request, res: Response) {
        return res.render('createPost')
    }

    static async home(req: Request, res: Response) {

        const search = req.query.search as string

        if (search) {

            const postSearch = await (await postRepository
                .find({ where: { content: Like(`%${search}%`) }, relations: { user: true } }))
                .map((post) => {

                    post.user.password = ''

                    const datePost = transformeDate(post.date)

                    return { post, diffDates: datePost }
                })

            return res.status(200).render('home', { posts: postSearch })
        }

        const posts = (await postRepository.find({ relations: { user: true } }))
            .map((post) => {

                post.user.password = ''

                const datePost = transformeDate(post.date)

                return { post, diffDates: datePost }

            })

        return res.status(200).render('home', { posts })
    }


    static async create(req: Request, res: Response) {

        const postShema = z.object({
            title: z.string().min(2, 'Errou'),
            content: z.string()
        })

        type Post = z.infer<typeof postShema>

        try {

            const { title, content } = postShema.parse(req.body)

            if (!title || !content) {

                return res.status(400).json('Fill all Fields')

            }
            const datePost = new Date()

            const newPost = await postRepository.create({ title, content, date: datePost, user: req.user })

            await postRepository.save(newPost)

            return res.status(201).redirect('/post/')
        } catch (error) {
            return res.status(400).render('createPost', { msg: 'Dados Inválidos' })
        }

    }

    static async viewPost(req: Request, res: Response) {
        const idPost = req.params.id

        if (!idPost) {
            return res.status(400).redirect('/post')
        }
        const post = await postRepository.findOne({ where: { id: Number(idPost) }, relations: { user: true } })

        if (!post) {
            return res.status(400).redirect('/post')
        }

        const datePost = transformeDate(post.date)

        const comments = await CommentController.showComments(Number(idPost))
        
        return res.status(200).render('viewPost', { post, diffDates: datePost, comments })
    }
}