import express from 'express';
import {
  readCarsData,
  addCar,
  getCarByIndex,
  deleteCarByIndex,
  updateCarByIndex
} from './cars.js';
import { config } from "dotenv";
config();
const app = new express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.get('/cars', (req, res) => {
  const cars = readCarsData();
  res.json(cars);
});

app.post('/cars', (req, res) => {
    const { name, model, manufacturer, price } = req.body;
  
    if (!name || !model || !manufacturer || !price) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
  
    const cars = readCarsData();
    for (let i = 0; i < cars.length; i++) {
      if (
        cars[i].name === name &&
        cars[i].model === model &&
        cars[i].manufacturer === manufacturer &&
        cars[i].price === price 
      ) {
        return res.status(400).json({ error: 'Car already exists' });
      }
    }
  
    const newCar = { name, model, manufacturer, price };
    const addedCar = addCar(newCar);
    res.status(201).json(addedCar);
  });
  

app.get('/cars/:index', (req, res) => {
  const { index } = req.params;
  const car = getCarByIndex(index);

  if (!car) {
    return res.status(404).json({ error: 'Car not found' });
  }

  res.json(car);
});

app.delete('/cars/:index', (req, res) => {
  const { index } = req.params;
  const success = deleteCarByIndex(index);

  if (!success) {
    return res.status(404).json({ error: 'Car not found' });
  }

  res.status(200).json({ message: 'Car deleted successfully' });
});

app.put('/cars/:index', (req, res) => {
  const { index } = req.params;
  const { name, model, manufacturer, price } = req.body;

  if (!name || !model || !manufacturer || !price) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const updatedCar = { name, model, manufacturer, price };
  const car = updateCarByIndex(index, updatedCar);

  if (!car) {
    return res.status(404).json({ error: 'Car not found' });
  }

  res.json(car);
});

app.listen(port, () => {
  console.log(`Server is running on : ${port}`);
});
