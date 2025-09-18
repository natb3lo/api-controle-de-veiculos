import { User } from "../models/user.js"
import bcrypt from 'bcrypt'

export const getUsers = async (req, res) => {
    try{
        const users = await User.find()
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

// update user...


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
        await User.deleteOne(userExist)
        return res.status(200).json({msg: 'user deleted'})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({msg: 'Ooops...something went wrong...'})
    }

}
