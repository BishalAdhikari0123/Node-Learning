function add(num1,num2){
    console.log(`the sum of ${num1} and ${num2} is ${num1+num2}`);

}
function sub(num1,num2){
console.log(`the difference of ${num1} and ${num2} is ${num1-num2}`);}
function mul(num1,num2){
console.log(`the multiplication of ${num1} and ${num2} is ${num1*num2}`);}
function div(num1,num2){
    console.log(`the div of ${num1} and ${num2} is ${num1/num2}`);
}
let functionHolder =null;
//assign a function to this variable
functionHolder=add;

//call that function of values 9 and 10 


functionHolder(9,10);