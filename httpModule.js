// const http = require('http');
// const server = http.createServer((req,res)=>{
//   res.writeHead(200,{'Content-Type':'text/plain'});
//   res.end('Hello World\n');
// });
// server.listen(8080);
// console.log("Server is running on port : 8080");
// console.log("Server Created!");
const http = require('http');
const server = http.createServer((req,res)=>{
  if(req.url==="/")
    res.end("This is home page!");
  else if(req.url==="/about")
    res.end("This is about page!");
});
server.listen(8080,()=>{
  console.log("Server is running on port : 8080");
});