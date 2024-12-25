const randomNum = new Promise((resolve, reject) => {
    const randomNumber = parseInt(Math.random() * 100);
    setTimeout(() => {
        if ((randomNumber%10)!==0) {
            resolve(`The random number, ${randomNumber} has no 0 at the end`);
        } else {
            reject(`The random number, ${randomNumber} has 0 at the end`);
        }
    }, 2000);
});
randomNum
.then((res) => console.log(res))
.catch((e) => console.log(e));

async function asyncAwait(){
    try {
        const res = await randomNum;
        console.log("The promise has been resolved: "+res);
        }
    catch (e) {
        console.log("The promise has been rejected: "+e);
    }
}
asyncAwait();
//for making streak