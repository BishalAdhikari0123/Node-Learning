import express from "express";
import { getCurrentViews, increaseViews } from "./helpers/views.js";
//import { increaseViews } from ".helpers/views.js";

import { config } from "dotenv";

config();

const server = new express();
 

server.get("/", (req, res) => {
    res.send("Views App.");
})
server.get("/views", (req, res) => {
    res.send(getCurrentViews());
})
server.get("/views/increase", (req, res) => {
    res.send(increaseViews());
})
server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
}) 