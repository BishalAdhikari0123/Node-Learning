import { model, Schema } from "mongoose";

const carSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        default: 100000,
    },
    manufacturer: {
        type: String,
        required: true,
    },
    makeYear: {
        type: Date,
        required: true,
    }
}, { timestamps: true })

const Car = model("Car", carSchema);

async function insertCar ({ name, price, manufacturer, makeYear }) {
    return Car.create({name, price, manufacturer, makeYear})
}



export {insertCar}

export default Car;