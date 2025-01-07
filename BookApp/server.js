// import express from 'express'
// import connectToDB from './connect.js'
// import { bookRouter } from './routes/car.js'
// import currencyRouter from './routes/currency.js'

import express from "express";
import connectToDB from "./connect.js";
import bookRouter from "./routeBook.js";
connectToDB().then(function (connectMessage) {
    console.log(connectMessage)
    const app = express();
    app.use(express.json())
    app.use("/books", bookRouter)
    app.use(bookRouter)
    const port = process.env.PORT || 4000;
    app.listen(port, function () {
        console.log("Server running on PORT", port)
    })
}).catch(function (err) {
    console.error(err)
})