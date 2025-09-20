import { Router } from "express";
import { deleteVehicle, getVehicles, getVehicleById, insertVehicle } from "../controllers/vehicleController.js";
import { insertVehicleValidator, validateResult } from "../middlewares/validation.js";
import { getLoggedUser } from "../middlewares/basicAuth.js";

const router = Router()

router.get('/', getVehicles)
router.get('/:vehicleId', getVehicleById)
router.post('/', insertVehicleValidator, validateResult, getLoggedUser, insertVehicle)
router.delete('/:vehicleId', getLoggedUser, getLoggedUser, deleteVehicle)

export default router