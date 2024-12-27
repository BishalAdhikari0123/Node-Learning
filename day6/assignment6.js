import express from 'express'
const app = express();

app.get('/', (req, res) => {
    let { first_number, last_number, operation } = req.query;
    first_number=parseInt(first_number);
    last_number=parseInt(last_number);
    let result;
    switch (operation) {
        case 'addition':    
            result = first_number + last_number;
            break;
        case 'subtraction':
            result = first_number - last_number;
            break;
        case 'multiplication':
            result = first_number * last_number;
            break;
        case 'division':
            if (last_number == 0) {
                return res.status(400).send('Error: Division by zero is not allowed.');
            }
            result = first_number / last_number;
            break;
        default:
            return res.status(400).send('Error: Invalid operation. Please use one of the following operations: addition, subtraction, multiplication, division.');
    }
    
    // res.send("Fill the numbers and operation in following URL format and paste it in browser")
    // res.send("Use the following URL format: http://localhost:3000/?first_number=....&last_number=....&operation=....")
    res.send(`The result of ${operation} between ${first_number} and ${last_number} is ${result}.`);
});

app.listen(4000, () => {
    console.log(`Server running at http://localhost:4000`);
});
