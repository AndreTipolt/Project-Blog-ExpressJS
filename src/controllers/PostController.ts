import { Request, Response } from "express";
import { postRepository } from "../repositories/PostRepository";


export class PostController {
    static home(req: Request, res: Response) {
        return res.status(200).json('Posts page')
    }

    static async create(req: Request, res: Response) {
        const { title, content } = req.body

        if (!title || !content) {

            return res.status(400).json('Fill all Fields')

        }
        const datePost = new Date()
        
        const newPost = await postRepository.create({ title, content, date: datePost, user: req.user })

        await postRepository.save(newPost)

        return res.status(201).json(newPost)

    }
}