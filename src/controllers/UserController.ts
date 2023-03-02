import { Request, Response } from "express";
import { userReposity } from "../repositories/UserRepository";

const bcrypt = require('bcrypt')

export class UserController{

    static  getcreateUser(req: Request, res: Response){
        res.json('preencha os dados')
    }
    static async createUser(req: Request, res: Response){
        const { name, email, password } = req.body

        const hashPassword = await bcrypt
        const newUser =  await userReposity.create({ name, email, password: hashPassword})
    }
}