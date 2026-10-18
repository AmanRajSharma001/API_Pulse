
const express = require("express");
const { apiPulse } = require("../src");
const stats = require("../src/stats");
const path = require("node:path");

const app = express();

app.use(apiPulse);

app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/stats", (req, res) => {
    res.sendFile(
        path.join(__dirname, "..", "public", "index.html")
    );
});

app.get("/", (req, res) => {
    res.send("ApiPulse is working!");
});

app.get("/users", (req, res) => {
    res.json([
        { id: 1, name: "Aman" },
        { id: 2, name: "Rahul" }
    ]);
});

app.get("/debug/stats", (req, res) => {
    res.json({
        ...stats,
        averageResponseTime: stats.totalRequests > 0
            ? stats.totalDuration / stats.totalRequests
            : 0
    });
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
