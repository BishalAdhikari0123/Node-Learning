import Joi from 'joi'

const car = {
    name: "Suzuki",
    engineType: "diesel",
    price: 5600,
    model: "XYZ",
    colors: [{
        "part": "wheel",
        "value": "black"
    }, {
        "part": "exterior",
        "value": "blue"
    },
    {
        "part": "seat",
        "value": "purple"
    }
    ],
    mileage: "32km",
    ownerDetails: {
        name: "Hari Acharya",
        age: 34,
        email: "hari@gmail.com",
        phone: "8989898989"
    }
}

const isStringOfFixedSize = Joi.string().min(3).max(30).required();

const carSchema = Joi.object().keys({
    name: isStringOfFixedSize,
    price: Joi.number().min(0).required(),
    engineType: Joi.string().valid("diesel", 'petrol', 'electric').required(),
    model: isStringOfFixedSize,
    mileage: Joi.string().alphanum().required(),
    colors: Joi.array().items(Joi.object().keys({
        part: Joi.string().valid("wheel", 'exterior', 'seat', 'handle').required(),
        value: Joi.string().valid("white", 'black', 'blue', 'purple').required()
    })).required(),
    ownerDetails: Joi.object().keys()({
        name: isStringOfFixedSize,
        age: Joi.number().min(0).max(100).required(),
        email : Joi.string().email().required(),
        phone: Joi.string().pattern(new RegExp('^[0-9\+]{8,12}$')).required()
    }).required() 
    
})

const validationResult = carSchema.validate(car, { abortEarly: false });

console.log(validationResult)