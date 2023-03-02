import { Request, Response } from "express";


export class PostController{
    static async home(req: Request, res: Response){
        return res.status(200).json('Posts page')
    }
}