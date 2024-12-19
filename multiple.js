// let num = 1;
// while(num<=10){
//     console.log(`5*${num}=${5*num}`);
//     num=num+1;
// }

function sumOfDigits(num){
    let sum = 0;
    while(num){
        sum += num % 10;
        num = parseInt(num / 10);
        
}
    console.log(sum);
}
sumOfDigits(52);