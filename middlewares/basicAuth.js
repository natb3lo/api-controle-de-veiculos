import pkg from 'jsonwebtoken';
const { verify } = pkg;
import { User } from "../models/user.js"

export const login = async(req, res, next) => {

    if(!req.headers.authorization){
        return res.status(401).json(
            {error: 'No authorization header provided. Use Basic Auth with Authorization: Basic <base64>'}
        )
    }

    const [scheme, hash] = req.headers.authorization.split(' ')
    if(scheme != 'Basic' || !hash){
        return res.status(401).json({ 
            error: 'Invalid authorization format. Use: Basic <base64>' 
        })
    }
    const [email, password] = Buffer.from(hash, 'base64').toString().split(':')

    req.auth = {email, password}

    next()
}

export const getLoggedUser = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if(!authHeader){
        return res.status(401).json(
            {error: 'You must include a Bearer token in the Authorization header.'}
        )

    }
    const [scheme, token] = authHeader.split(' ')
    if(scheme != 'Bearer' || !token){
        return res.status(401).json(
            {error: 'Invalid authorization format. Use: Bearer <token>'}
        )

    }
    try{
        const payload = await verify(token, process.env.SECRET)
        const user = await User.findById(payload.id)
        if(!user){
            return res.status(401).json({msg: 'invalid token'})

        }
        req.auth = user
        next()
    }
    catch(err){
        console.log(err)
        res.status(401).json({error: 'Invalid or expired token'})
    }

    //console.log(authHeader)
}