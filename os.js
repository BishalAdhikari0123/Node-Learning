const os = require('os')
const platform = os.platform();
console.log(platform);
console.log(os.cpus());
console.log(`total memory: ${os.totalmem()}`);
console.log(`free memory: ${os.freemem()}`);

