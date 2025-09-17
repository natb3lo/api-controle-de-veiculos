import { Router } from "express";
import { insertUser, getUsers } from "../controllers/userController.js";
import { signupValidation, insertVehicleValidator, validateResult } from "../middlewares/validation.js";
import { signToken } from "../middlewares/jwt.js";

const router = Router()

//router.get('/login', , getUsers)

// POST ROUT ---> /auth/signup
router.post('/signup', signupValidation, validateResult, insertUser, signToken)

export default router