const os = require('os')
const platform = os.platform();
console.log(`Platform: ${platform}`); //shows platform name
console.log(`CPU Details: ${JSON.stringify(os.cpus(),null,2)}`); //shows cpu details
console.log(`total memory: ${os.totalmem()}`);
console.log(`free memory: ${os.freemem()}`);

console.log(`Uptime: ${os.uptime()}`);
