const express = require("express");
const {apiPulse} = require("../src");
const app = express();

app.use(apiPulse);

app.get("/", (req, res) => {
    res.send("ApiPulse is working!");
});

app.get("/users", (req, res) => {
    res.json([
        { id: 1, name: "Aman" },
        { id: 2, name: "Rahul" }
    ]);
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});