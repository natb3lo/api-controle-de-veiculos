import { Router } from "express";
import { getUsers, insertUser } from "../controllers/userController.js";

const router = Router()

router.get('/', getUsers)
router.post('/', insertUser)

export default router