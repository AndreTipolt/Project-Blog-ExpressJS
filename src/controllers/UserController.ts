import 'dotenv/config'
import { Request, Response } from "express";
import { userReposity } from "../repositories/UserRepository";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import express from 'express'
import { z } from 'zod'

const secret = process.env.SECRET


export class UserController {

    static getCreateUser(req: Request, res: Response) {
        res.render('createUser')
    }

    static async createUser(req: Request, res: Response) {


        const userSchema = z.object({
            name: z.string().min(3, { message: 'O nome precisa de no mínimo 3 caracteres' }),
            lastName: z.string().min(3),
            email: z.string().email(),
            password: z.string().min(5, { message: 'Senha muito curta' }),
            birthDate: z.string(),
            gender: z.string().max(1)
        })

        type User = z.infer<typeof userSchema>

        const { name, email, gender, birthDate, lastName } = req.body

        let feminine;
        
        const masculine = gender === 'm' ? true : feminine = true 
        
        var userReq = {
            name,
            email,
            gender,
            birthDate,
            lastName,
            masculine,
            feminine
        }
        
        try {
            
            const { name, email, password, gender, birthDate, lastName } = userSchema.parse(req.body)

            const userExists = await userReposity.findOneBy({ email })

            if (userExists) {

                return res.status(400).render('createUser', { msg: 'Esse email já existe', userReq })
            }

            const hashPassword = await bcrypt.hash(password, 10)
            const newUser = await userReposity.create({
                name,
                email,
                password: hashPassword,
                gender,
                lastName,
                birthDate
            })

            await userReposity.save(newUser)

            try {

                const token = await jwt.sign({ id: newUser.id }, secret ?? '', { expiresIn: '3h' })

                res.cookie('token', token)
                return res.status(201).redirect('/post')

            } catch (error) {
                console.log(error);

                return res.status(500).json('Internal Server Error')
            }
        } catch (error: any) {
            const messageError = error.errors[0].message

            return res.render('createUser', { msg: messageError, userReq })

        }
    }

    static getLogin(req: Request, res: Response) {
        return res.status(200).render('loginUser')
    }

    static async login(req: Request, res: Response) {


        const userSchema = z.object({
            email: z.string().email(),
            password: z.string()
        })

        const { email, password } = userSchema.parse(req.body)

        if (!email || !password) {

            return res.status(200).render('loginUser', { email })
        }

        const user = await userReposity.findOneBy({ email })

        if (!user) {
            return res.status(400).render('loginUser', { msg: 'Usuário ou senha inválidos', email })
        }

        const checkPassword = await bcrypt.compare(password, user.password)

        if (!checkPassword) {
            return res.status(400).render('loginUser', { msg: 'Usuário ou senha inválidos', email })
        }

        const token = await jwt.sign({ id: user.id }, secret ?? '', { expiresIn: '3h' })

        res.cookie('token', token)

        return res.status(200).redirect('/post')

    }
}