import express from "express";
import { getCurrentViews, increaseViews, decreaseViews, resetViews } from "./helpers/views.js";
import { config } from "dotenv";

config();

const server = new express();

server.get("/", (req, res) => {
    res.send("Views App.");
});

server.get("/views", (req, res) => {
    res.send(getCurrentViews());
});

server.get("/views/increase", (req, res) => {
    res.send(increaseViews());
});

server.get("/views/decrease", (req, res) => {
    res.send(decreaseViews());
});

server.get("/views/reset", (req, res) => {
    res.send(resetViews());
});


server.get("/views/todo/add/:task", (req, res) => {
    res.send(req.params);
});


server.get("/views/task/remove", (req, res) => {
    res.send(removeTask());
});


server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
