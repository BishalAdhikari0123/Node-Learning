// async function countdown(seconds) {
//         for(let i=seconds;i>=0;i--){
//         console.log(i);
// }}
// const countdown1 = new Promise((resolve, reject) => {
    
//     setTimeout(()=>{
//         resolve(seconds);
//     },1000)
//     reject("Countdown failed");
// });

// countdown1(5).then(() => console.log("Countdown completed"));
// countdown1(5).catch((e) => console.log(e));



async function countdown(seconds) {
    return new Promise((resolve, reject) => {
        if(seconds < 0){
            reject("Countdown failed");
        }
        
        let interval = setInterval(()=>{
            console.log('Seconds:', seconds);
            seconds--;
            if (seconds < 0) {
            resolve(seconds);
            clearInterval(interval);
            }

        },1000)
    });
}
countdown(5)
.then(() => console.log("Countdown Completed"))
.catch((e) => console.log(e));


