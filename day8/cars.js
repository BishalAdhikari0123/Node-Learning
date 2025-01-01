import fs from 'fs';
import path from 'path';
const carsFilePath = path.resolve('cars.json');

const readCarsData = () => {
  const data = fs.readFileSync(carsFilePath, 'utf-8');
  return JSON.parse(data).cars;
};

const saveCarsData = (cars) => {
  const data = JSON.stringify({ cars }, null, 2);
  fs.writeFileSync(carsFilePath, data, 'utf-8');
};

const addCar = (newCar) => {
    const cars = readCarsData();
    const updatedCars = [...cars, newCar];
    saveCarsData(updatedCars);
    return newCar;
  };
  

const getCarByIndex = (index) => {
  const cars = readCarsData();
  return cars[parseInt(index)];
};

const deleteCarByIndex = (index) => {
    const cars = readCarsData();
    const carIndex = parseInt(index);
  
    if (cars[carIndex]) {
      cars.splice(carIndex, 1);
      saveCarsData(cars);
      return true;
    }
    return false;
  };
  

const updateCarByIndex = (index, updatedCar) => {
    const cars = readCarsData();
    const carIndex = parseInt(index);
  
    if (cars[carIndex]) {
      cars[carIndex] = { ...cars[carIndex], ...updatedCar };
      saveCarsData(cars);
      return cars[carIndex];
    }

    return null;
  };

export {
  readCarsData,
  saveCarsData,
  addCar,
  getCarByIndex,
  deleteCarByIndex,
  updateCarByIndex
};
