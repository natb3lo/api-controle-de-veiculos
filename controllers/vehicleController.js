import { Vehicle } from "../models/vehicle.js"
import mongoose from "mongoose"

export const getVehicles = async (req, res) => {
    try{
        const vehicles = await Vehicle.find()
        if(vehicles.length == 0){
            return res.status(200).json({msg: 'No vehicles were registered yet'})
        }
        return res.status(200).json(vehicles)
    }
    catch(err){
        console.log(err)
        return res.status(500).json({ error: err.message });
    }
}

export const getVehicleById = async (req, res) => {
    const {vehicleId} = req.params
    if(!vehicleId){
        return res.status(400).json({msg: 'userId is mandatory'})
    }
    try{
        const vehicle = await Vehicle.findById(vehicleId)
        if(!vehicle){
            return res.status(400).json({msg: 'vehicle does not exist'})
        }
        return res.status(200).json(vehicle)
    }
    catch(err){
        console.log(err)
        return res.status(500).json({msg: 'Ooops...something went wrong...'})
    }
}

export const insertVehicle = async (req, res) => {
    const {model, brand, type, price} = req.body
    const user = req.auth
    try{
        const vehicle = new Vehicle(
            {
                model: model,
                brand: brand,
                type: type,
                price: price,
                user: user._id
            }
        )

        await vehicle.save()

        user.vehicles.push(vehicle._id)
        await user.save()
        return res.status(201).json(vehicle);
    }
    catch(err){
        console.log(err)
        return res.status(500).json({ error: err.message });
    }
}

export const deleteVehicle = async (req, res) => {
    const {vehicleId} = req.params
    const user = req.auth
    if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
        return res.status(400).json({ msg: 'Invalid vehicle id' });
    }
    try{
        const vehicles = await Vehicle.find({user: user._id})
        if(!vehicles){
            return res.status(400).json({msg: 'No vehicles registered for this user yet'})
        }
        const vehicleToDelete = vehicles.find(v => v._id.toString() === vehicleId)
        if(!vehicleToDelete){
             return res.status(404).json({ msg: 'Vehicle not found for this user' });
        }
        await Vehicle.findByIdAndDelete(vehicleToDelete._id)
        await user.vehicles.pull(vehicleToDelete._id)
        await user.save()
        return res.status(200).json({msg: 'vehicle deleted'})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({ error: err.message });
    }

}