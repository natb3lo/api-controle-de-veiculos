import { Router } from "express";
import { deleteUser, getUsers, insertUser } from "../controllers/userController.js";
import { deleteUserValidation, validateResult } from "../middlewares/validation.js";
console.log("Arquivo userRoutes foi importado!");
const router = Router()

router.get('/', getUsers)
router.post('/', insertUser)
router.delete('/:userId', deleteUserValidation, validateResult, deleteUser)

export default router