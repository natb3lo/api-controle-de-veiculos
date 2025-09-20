import { User } from "../models/user.js"
import bcrypt from 'bcrypt'

export const getUsers = async (req, res) => {
    
    try{
        
        const users = await User.find().populate('vehicles')
        if(users.length == 0){
            return res.status(200).json({msg: 'No users were registered yet'})
        }
        
        return res.status(200).json(users)
    }
    catch(err){
        console.log(err)
        return res.status(500).json({ error: err.message });
    
    }
}

export const insertUser = async (req, res, next) => {
    
    const {name, email, password, confirmPasswor} = req.body  
    
    try{
        const userExist = await User.findOne({email: email})

        if(userExist){
            return res.status(400).json({msg: 'Email already in use'})
        }
        const salt = await bcrypt.genSalt(11)
        const hash = await bcrypt.hash(password, salt)
        const user = new User({
            name: name,
            email: email,
            password: hash 
        })
        await user.save()
        req.user = user
    }
    catch(err){
        console.log(err)
        return res.status(500).json({error: err.message})
    }
    next()
}

export const deleteUser = async(req, res, next) => {

    const {userId} = req.params
    if(!userId){
        return res.status(400).json({msg: 'userId is mandatory'})
    }
    try{
        const user = await User.findOne({_id: userId})
        if(!user){
            return res.status(400).json({msg: 'user does not exist'})
        }
        await User.deleteOne(user)
        return res.status(200).json({msg: 'user deleted'})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({msg: 'Ooops...something went wrong...'})
    }

}

export const getUserByBasicAuth = async(req, res, next) => {

    const {email, password} = req.auth
    if(!email || !password){
        return res.status(404).json({msg: 'Email and Password fields must be provided'})
    }
    
    try{
        const user = await User.findOne({email: email}).select('+password')

        if(!user){
            return res.status(400).json({msg: 'Email or Password incorrects'})
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if(!isPasswordCorrect){
            return res.status(400).json({msg: 'Email or Password incorrects'})
        }
        req.user = user
        req.sentFrom = '/auth/login'
        next()
    }
    catch(err){
        console.log(err)
        return res.status(500).json({msg: 'Ooops...something went wrong...'})
    }
    
}
