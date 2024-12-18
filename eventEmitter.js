// const events = require("events");

// const myEmitter = new events();

// myEmitter.on('hello',(name)=>{
//     console.log(`Hello ${name}!`);
// });
// myEmitter.emit('hello',"Bishal");


const event = require('events');

const emitter = new event();

emitter.on('Login',(user)=>{
    if(user == "Bishal")
    console.log(`${user} Logged In!!`);
else console.log("Wrong Name!");
});

emitter.emit('Login',"Bishl");
emitter.emit('Login',"Bishal");

const aRray = new Array('a','b','c');
console.log(aRray[1]);
// const aRray = new Array("first"=>"a","second"=>"b");