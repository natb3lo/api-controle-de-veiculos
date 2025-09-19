import express from 'express'
import dbConnect from './database/init.js'
import dotenv from "dotenv";
import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'
import { getLoggedUser } from './middlewares/basicAuth.js';

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

// ROUTE --> /
app.get('/', async (req, res) => {
    res.status(200).json({msg: 'Welcome to the API!!'})
})

app.get('/me', getLoggedUser, async (req, res) => {
    res.status(200).json(req.auth)
})

//ROUTE --> /auth
app.use('/auth', authRoutes)

// ROUTE --> /users
app.use('/users', userRoutes)