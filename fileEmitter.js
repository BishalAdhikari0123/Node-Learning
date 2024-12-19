const eventS = require('events');
const fs = require('fs');
const myEvent = new eventS();
const fileName = 'myFile.txt';
const content = 'This is content of file';
myEvent.on('fileEmit',()=>{
    fs.writeFile(fileName,content,(err)=>{
        if(err){
            
            console.log(err);
        }
            else{
        console.log("file Write Successfully!");
        }
    });
    fs.appendFile(fileName,'\nAppended',(err)=>{
        if (err)
            console.log(err);
        else
        console.log("Appended!");
    });
});
myEvent.emit('fileEmit');