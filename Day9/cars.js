import { Model,schema } from "mongoose";

const carSchema = new schema({
    name:{
        type:String,
        required:true
    },
    price :{
        type:Number,
        required:true
    },
    manufacturer:{
        type:String,
        required:true
    },
    makeYear:{
        type:Number,
        required:true
    },timestamps:true});

const Car = Model('Car',carSchema);
async function insertCar(name,price,manufacturer,makeYear){
    return Car.create({name,price,manufacturer,makeYear});
}
