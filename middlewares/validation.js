import { body, validationResult, Result } from "express-validator"


export const signupValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is mandatory'),
    body('email')
        .trim().notEmpty()
        .withMessage('Email is mandatory')
        .isEmail()
        .withMessage('Invalid Email format'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Password is mandatory')
        .isLength({min: 4})
        .withMessage('Password must need at least 4 characters'),
    body('confirmPassword')
        .trim()
        .notEmpty()
        .withMessage('It is necessary to confirm your password')
        .custom((value, {req}) => {
            if (value !== req.body.password){
                throw new Error('Passwords do not match')
            }
            return true
        })
]

export const insertVehicleValidator = [
    body('brand')
        .trim()
        .notEmpty()
        .withMessage('Brand is mandatory'),
    body('model')
        .trim().notEmpty()
        .withMessage('Model name is mandatory'),
    body('type')
        .trim().notEmpty()
        .withMessage('Type of Vehicle is mandatory'),
    body('price')
        .trim()
        .notEmpty()
        .isNumeric()
        .withMessage('Price must be a numeric value'),
]

export const validateResult = async (req, res, next) => {
    const result = validationResult(req)
    if(!result.isEmpty()){
        return res.status(400).json({errors: result.array()})
    }
    next()
}

