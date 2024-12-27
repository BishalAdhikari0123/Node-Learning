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
            if (last_number === 0) {
                return res.status(400).send('Error: Division by zero is not allowed.');
            }
            result = first_number / last_number;
            break;
    }

    res.send(`The result of ${operation} between ${first_number} and ${last_number} is ${result}.`);
});

app.listen(3000, () => {
    console.log(`Server running at http://localhost:3000`);
});
