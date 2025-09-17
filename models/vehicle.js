import mongoose from "mongoose";

export const vehicleSchema = new mongoose.Schema(
    {
        model: String,
        brand: String,
        type: String,
        price: Number
    }
)

export const Vehicle = mongoose.model('Vehicle', vehicleSchema)