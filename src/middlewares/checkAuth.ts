import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { userReposity } from "../repositories/UserRepository";

type JwtPayload = {
    id: number
}


export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {

    const cokkies = req.get('cookie')?.split('; ')

    const token = cokkies?.reduce((anterior: string, atual: string) => atual.includes('token') ? atual : anterior).substring(6)
        
    if (!token) {
        
        return res.redirect('/user/login')
    }
    
    try {
        
        const { id } = await jwt.verify(token, process.env.SECRET ?? '') as JwtPayload

        const user = await userReposity.findOneBy({ id })
        if(!user){
            return res.redirect('/user/login')
        }
        
        const {password: _,...loggedUser} = user
    
    
        req.user = loggedUser

        next()

    } catch (error) {
        return res.redirect('/user/login')
    }
}