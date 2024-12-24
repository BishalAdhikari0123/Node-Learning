//Task 1:Write a function named modulus that calculates the remainder of two numbers and pass it as a callback to the calculate function.

function modulus(n1,n2){
    console.log(`the modulus of ${n1} and ${n2} is ${n1 % n2}`);
}
function calculate(a,b,callback){
    callback(a,b);
}
calculate(2,2,modulus);

//Task 2: Write a function named isGreater that takes two numbers as arguments and logs which number is greater. Pass this function as a callback to the calculate function.

function isGreater(n1,n2){
    if(n1 > n2){
        console.log(`${n1} is greater than ${n2}`);
        }
        else{
            console.log(`${n2} is greater than ${n1}`);
            }
            }
function calculate(a,b,callback){
        callback(a,b);
    }
calculate(2,3,isGreater);

//Task 3:Write a function named processArray that takes an array of numbers and a callback function. Use the callback function to calculate the sum of all even numbers in the array.
function processArray(arr,callback){

    let sum = 0;
    for(let i = 0; i < arr.length; i++){
        if(arr[i] % 2 == 0){
            sum += arr[i];
            }
        }
    callback(sum);
            
}
function sumEvenNumbers(totalSum){
    console.log(`The sum of even numbers is ${totalSum}`);
    }
processArray([1,2,3,4,5,6],sumEvenNumbers);

//Task 4:Create a function square that returns the square of a number. Pass it as a callback to a new transform function that applies the callback to each number in an array and returns the transformed array.

function square(n){
    return n * n;
}   
function transform(arr,callback){
    let newArray = [];
    for(let i = 0; i < arr.length; i++){
        newArray.push(callback(arr[i]));
    }
    console.log("The New Array is: "+ newArray)
}
transform([1,2,3,4,5,6],square)

//Task 5: Write a function concatenateStrings that takes two strings, concatenates them, and returns the result. Pass this as a callback to a generic function that takes two strings and a callback.
function concatenateStrings(str1,str2){
    return str1 + str2;
}
function genericFunction(str1,str2,callback){
    let newString = callback(str1,str2);
    console.log("The concated string is " +newString)
}
genericFunction("Bishal","Adhikari",concatenateStrings)

// Task 6: Create a function chainCalculate that takes two numbers and two callbacks. The first callback performs an operation (e.g., addition), and the second callback uses the result to perform another operation (e.g., multiplication by 2).


function add(a,b){
    return a+b;
}
function multiResult(a,b,callback){
    let sum = callback(a,b);
    return sum*2;
}
function chainCalculate(a,b,callback1,callback2){
    let sum = callback1(a,b);
    let product = callback2(a,b,callback1);
    console.log("The sum result is: "+ sum);
    console.log("The product to the result by 2: "+ product);

}


chainCalculate(4,5,add,multiResult)

//Task 7:Write a function delayedMultiply that takes two numbers and a callback function. Use setTimeout to simulate a delay, and after 2 seconds, pass the result of multiplying the two numbers to the callback.

function delayedMultiply (a,b,callback){

    setTimeout(()=>{
        let product = a * b;    
        callback(product);
        },2000);
    }
function multiplyResult(result){
    console.log("The result of the multiplication is: "+ result);
}
delayedMultiply(4,5,multiplyResult);

//Task 8:Write a function chooseOperation that takes a string ('add', 'subtract', 'multiply', 'divide') and dynamically assigns one of your predefined calculation functions (like add or subtract) to a callback. Use this callback to calculate the result for two numbers.
function multiply(n1,n2){
    return n1 * n2;
}
function chooseOperation(operationStr,operation,num1,num2){
    operationStr = operation(num1,num2);
    console.log(`The result of the operation is:`+ operationStr);
}
chooseOperation('Multiply',multiply,2,3)

//Task 9:
function highOrderOperation(num1,num2,callback){
    let results= callback(num1,num2);
    if(results>10){
        console.log("The Average is greater than 10 and the value is : "+results)
    
    }
    else{
        console.log("The Average is less than 10 and the value is : "+results)
    }
}
function average(n1,n2){
    return (n1 + n2) / 2;
}
highOrderOperation(2,3,average)


//Task 10: 
function validateAndCalculate(num1,num2,callback){
    
    if(callback(num1,num2)){
        console.log("The Numbers are positive")
    }
    else{
        console.log("The Numbers are not positive")
    }
}
function validate(n1,n2){
    if(n1 > 0 && n2>0){
        return true;
    }
    else{
        return false;
    }
}
validateAndCalculate(2,-3,validate)

