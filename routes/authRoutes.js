import { Router } from "express";
import { insertUser, getUsers, getUserByBasicAuth } from "../controllers/userController.js";
import { signupValidation, insertVehicleValidator, validateResult } from "../middlewares/validation.js";
import { signToken } from "../middlewares/jwt.js";
import { login } from "../middlewares/basicAuth.js";

const router = Router()

// GET ROUT ---> /auth/login
router.get('/login', login, getUserByBasicAuth, signToken)

// POST ROUT ---> /auth/signup
router.post('/signup', signupValidation, validateResult, insertUser, signToken)

export default router