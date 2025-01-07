import express from 'express'
import connectToDB from './connect.js'
import { carRouter } from './routes/cars.js'


connectToDB().then(function (connectMessage) {
    console.log(connectMessage)
    const app = express();
    app.use(express.json())
    app.use( carRouter)
    const port = process.env.PORT || 4000;
    app.listen(port, function () {
        console.log("Server running on PORT", port)
    })
}).catch(function (err) {
    console.error(err)
})