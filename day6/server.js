import express from "express";
const server = new express();
server.get("/", (req, res) => {
    res.send(req.query);
});
server.listen(3000,(()=>{
    console.log("Server is running on port 3000");
}));
