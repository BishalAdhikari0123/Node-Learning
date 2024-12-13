const fs = require('fs')
// fs.writeFile('file.txt','hello',(err)=>{
//     if(err) console.log(err);
//     console.log("Success!")
// })
// const data = fs.readFile('file.txt','utf-8',(err,data)=>{
//     if(err) console.log(err);
//     console.log(data)
// })
// fs.appendFile('file.txt','Bishal',(err)=>{
//     if(err) console.log(err);
//     console.log("Appended!")
// })

fs.unlink('file.txt',(err)=>{
    if(err) console.log(err);
    console.log("File deleted!")
})