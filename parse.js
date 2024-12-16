const path = require('path');
const filePath = "abcd/abc.txt";
const a = path.basename(filePath);//gives the name of a file
console.log(a);
const b = path.dirname(filePath); //gives the directory name
console.log(b);
console.log(path.extname(filePath));//gives extension name

