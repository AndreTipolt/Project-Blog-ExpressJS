import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { userReposity } from "../repositories/UserRepository";

type JwtPayload = {
    id: number
}


export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {

    const authorization = req.headers['authorization']

    console.log(req.session.id);

    if (!authorization) {
        return res.redirect('/user/login')
    }

    const token = authorization.split(' ')[1]

    
    try {
        
        const { id } = await jwt.verify(token, process.env.SECRET ?? '') as JwtPayload

        const user = await userReposity.findOneBy({ id })
        if(!user){
            return res.status(401).json('Invalid Token')
        }
        
        const {password: _,...loggedUser} = user
    
    
        req.user = loggedUser

        next()

    } catch (error) {
        return res.redirect('/user/login')
    }
}