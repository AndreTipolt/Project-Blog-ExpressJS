import 'dotenv/config'
import { Request, Response } from "express";
import { userReposity } from "../repositories/UserRepository";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export class UserController {

    static getCreateUser(req: Request, res: Response) {
        res.json('Preencher os dados')
    }

    static async createUser(req: Request, res: Response) {
        const { name, email, password } = req.body

        const secret = process.env.SECRET

        const userExists = await userReposity.findOneBy({ email })

        if (!name || !email || !password) {

            return res.status(400).json('Fill all fields')

        } else if (!email.includes('@')) {

            return res.status(400).json('Invalid Email')

        } else if (userExists) {

            return res.status(400).json('Email already exists')
        }

        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = await userReposity.create({ name, email, password: hashPassword })

        await userReposity.save(newUser)

        const token = await jwt.sign({ id: newUser.id }, secret ?? '', { expiresIn: '8h'} )

        return res.status(201).json({ msg: 'User Created !', token })



    }
}