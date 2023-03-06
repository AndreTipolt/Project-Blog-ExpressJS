import 'dotenv/config'
import { Request, Response } from "express";
import { userReposity } from "../repositories/UserRepository";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import express from 'express'

import session from 'express-session';

const secret = process.env.SECRET


const app = express()
export class UserController {

    static getCreateUser(req: Request, res: Response) {
        res.render('createUser')
    }

    static async createUser(req: Request, res: Response) {
        const { name, email, password } = req.body


        if (!name || !email || !password) {

            return res.status(400).render('createUser', { msg: 'Preencha todos os campos' })

        } else if (!email.includes('@')) {

            return res.status(400).render('createUser', { msg: 'Email Inválido' })

        } else if (password.length < 5) {

            return res.status(400).render('createUser', { msg: 'Senha muito curta' })

        }

        const userExists = await userReposity.findOneBy({ email })

        if (userExists) {

            return res.status(400).render('createUser', { msg: 'Esse email já existe' })
        }

        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = await userReposity.create({ name, email, password: hashPassword })

        await userReposity.save(newUser)
        try {
            
            const token = await jwt.sign({ id: newUser.id }, secret ?? '', { expiresIn: '8h' })

            res.cookie('token', token)
            return res.status(201).redirect('/post')

        } catch (error) {
            console.log(error);
            
            return res.status(500).json('Internal Server Error')
        }
    }

    static getLogin(req: Request, res: Response) {
        return res.status(200).json('Page Login')
    }

    static async login(req: Request, res: Response) {

        const { email, password } = req.body

        if (!email || !password) {

            return res.status(400).json('Fill all Fields')

        } else if (!email.includes('@')) {

            return res.status(400).json('Invalid Email')
        }

        const user = await userReposity.findOneBy({ email })

        if (!user) {
            return res.status(400).json('User or Password Invalids')
        }
        
        const checkPassword = await bcrypt.compare(password, user.password)

        if (!checkPassword) {
            return res.status(400).json('User or Password Invalids')
        }

        const token = await jwt.sign({ id: user.id }, secret ?? '', { expiresIn: '8h' })

        return res.status(200).json({ msg: 'Logged', token })

    }
}