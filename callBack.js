// function sum(callback,x,y){
//     const result = x+y;
//     callback(result);
// }
// function display(result){
//     console.log(`the result is ${result}`);
// }
// sum(display,3,4);


// function hello(){
// setTimeout(()=>{
//     console.log("hi")
// },2000)    
// }

// function leave(){
//     console.log("leave")
// }

// hello();
// leave();

function regUser(data,callback){
    console.log("User Registered!",data)
    callback(data.email,data.phone);
}

function sendMail(email,callback){
console.log("Email Sent!",email);
callback();
}

function verifyPhone(phone,callback){
    console.log("Phone Verified!",phone)
    callback();

}
function login(email,callback){
    console.log(`login success with ${email}`)
    callback();
}

regUser({name:"BIshal",age:"23",email:"bsalaeaf",phone:"12445"},(email,phone)=>{
    sendMail(email,()=>{
    verifyPhone(phone,()=>{
        login(email,(()=>{
            console.log("Welcome to the app");
        }))
    })
    })
});
