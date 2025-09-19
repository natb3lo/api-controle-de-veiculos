import jwt from 'jsonwebtoken';
import dotenv from "dotenv"

dotenv.config()

export const signToken = async (req, res) => {
    const user = req.user
    const secret = process.env.SECRET
    const token = jwt.sign({id: user.id}, secret, {expiresIn: '4h'})

    if(req.sentFrom == '/auth/login'){
        return res.status(200).json(
            {
                msg: 'Login accepted',
                user: {
                    name: user.name,
                    email: user.email
                },
                token: token
            }
        )
    }

    return res.status(201).json(
        {
            msg: 'User created', 
            user: {
                name: user.name,
                email: user.email
            },
            token: token 
        }
    )

}

