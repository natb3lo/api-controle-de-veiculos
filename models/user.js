import mongoose from "mongoose";
import { vehicleSchema } from "./vehicle.js";

const userSchema = new mongoose.Schema(
    {
        name: String,
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
            select: false
        },
        vehicles: [vehicleSchema],
    }
)

export const User = mongoose.model('User', userSchema)