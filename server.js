import express from 'express'
import dbConnect from './database/init.js'
import dotenv from "dotenv";
import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'

dotenv.config(); // Loads enviroment variables

const app = express() // Loads express

app.use(express.json()); //Enables express to interpret JSON

const port = process.env.DEFAULT_PORT // Sets default application port

// Connects to the Database
await dbConnect()

// Starts application
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

// Main route
app.get('/', (req, res) => {
    res.status(200).json({msg: 'Welcome to the API!!'})
})

//Auth routes
app.use('/auth', authRoutes)

// User routes
app.use('/users', userRoutes)