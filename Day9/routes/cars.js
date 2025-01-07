import { Router } from "express";
import Car,{insertCar} from "../model/car.js"
import {addCarSchema} from "../validation/car.js"
const carRouter = Router();

carRouter.get("/", async function (req, res) {
    const carsInDatabase = await Car.find({})
    return res.json(carsInDatabase)
})
// carRouter.post('/', async (req, res) => {
//   try {
//     const { name, price, manufacturer, makeYear } = req.body;

//     // const cars = await Car.findOne({_id});

//     // for (let i = 0; i < cars.length; i++) {
//     //   if (
//         // cars[i].id === 
//         // cars[i].name === name &&
//         // cars[i].price === price &&
//         // cars[i].manufacturer === manufacturer &&
//         // cars[i].makeYear === makeYear
//     //   ) {
//     //     return res.status(400).json({ error: 'Car already exists' });
//     //   }
//     // }
//     const car = new Car({ name, price, manufacturer, makeYear });
//     await car.save();
//     res.status(201).json(car);
    
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });
carRouter.post("/", async function (req, res) {
  try {
   const validationResult = addCarSchema.validate(req.body,{abortEarly:false})
   if(validationResult.error){
      throw new Error("Validation Error" + validationResult.error.message)
   }
   const newCar = await insertCar(validationResult.value)
      return res.status(201).json({car: newCar})
      
  } catch (e) {
      return res.status(400).json({error: e.message})
  }
  
})


  carRouter.get('/:id', async (req, res) => {
    try {
      const car = await Car.findById(req.params.id);
      if (!car) return res.status(404).send('Car not found');
      res.send(car);
    } catch (err) {
      res.status(400).send(err.message);
    }
  });

  carRouter.put('/:id', async (req, res) => {
    try {
      const car = await Car.findById(req.params.id);
      if (!car) return res.status(404).send('Car not found');
  
      car.make = req.body.make || car.make;
      car.model = req.body.model || car.model;
      car.year = req.body.year || car.year;
      car.price = req.body.price || car.price;
      await car.validate();
      const updatedCar = await car.save();
  
      res.send(updatedCar);
    } catch (err) {
      res.status(400).send(err.message);
    }
  });
  carRouter.delete('/:id', async (req, res) => {
    try {
      const car = await Car.findByIdAndDelete(req.params.id);
      if (!car) return res.status(404).send('Car not found');
      res.send(car);
    } catch (err) {
      res.status(400).send(err.message);
    }
  });
  
  
export {carRouter}