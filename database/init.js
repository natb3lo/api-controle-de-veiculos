import mongoose from "mongoose";

const dbConnect = async () => {
    
    const dbUsername = process.env.DB_USERNAME
    const dbPassword = process.env.DB_PASSWORD
    const dbHost = process.env.DB_HOST
    const dbPort = process.env.DB_PORT
    
    try{
        await mongoose.connect(`mongodb://${dbUsername}:${dbPassword}@${dbHost}:${dbPort}`)
        console.log('Connected to the Database')
    }
    catch(err){
        console.log('Error connecting to the Database: ' + err)
    }

}

export default dbConnect

