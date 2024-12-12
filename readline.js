const readline = require('readline').createInterface({
    input : process.stdin,
    output : process.stdout,
});
readline.question('what is you name?', name=>{
    console.log('hi ' + name);
    readline.close();
});