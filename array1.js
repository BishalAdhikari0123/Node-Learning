let cars = ['volvo','bmw','tesla','mercedes'];
// for(i=0; i < cars.length;i++){
//     console.log(cars[i])
// }
for(let carName of cars){
    console.log(carName)
}
//remove first item
cars.shift();
//add items
cars.push('byd')
//add at first
cars.unshift('bisahl')
for(let carName of cars){
    console.log(carName)
}