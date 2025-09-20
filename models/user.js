import mongoose from "mongoose";

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
        vehicles: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vehicle"
        }],
    }
)

export const User = mongoose.model('User', userSchema)