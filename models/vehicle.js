import mongoose from "mongoose";

export const vehicleSchema = new mongoose.Schema(
    {
        model: String,
        brand: String,
        type: String,
        price: Number,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    }
)

export const Vehicle = mongoose.model('Vehicle', vehicleSchema)