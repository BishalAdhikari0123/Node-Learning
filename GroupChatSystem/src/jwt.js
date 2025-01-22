import jwt from "jsonwebtoken";

// const token = jwt.sign("bishal","secretKey")
// console.log(token)

let isVerified = false;
let payload = null;
try{
    payload = jwt.verify("",'secretKey');
    console.log("found",payload);
}catch(e){
    
}

