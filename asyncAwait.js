const promise = new Promise((resolve, reject) => {
    const res = setTimeout(function () {
      resolve(1);
      clearTimeout(res);
    }, 2000);
    const rej = setTimeout(function () {
      reject(0);
      clearTimeout(rej);
    }, 1000);
  });
  async function asyncAwait(){
    try {
        const res = await promise;
        console.log("The promise has been resolved "+res);
        }
    catch (rej) {
        console.log("The promise has been rejected "+rej);
    }
}
asyncAwait();

let num = math.random();
console.log(num)