const promise = new Promise((resolve, reject) => {
  const res = setTimeout(function () {
    resolve(1);
    clearTimeout(res);
  }, 2000);
  const rej = setTimeout(function () {
    reject(0);
    clearTimeout(rej);
  }, 2000);
});
promise
.then(function(res) {
  console.log("The promise has been resolved "+res);
})
.catch(function(rej) {
  console.log("The promise has been rejected "+rej);
});