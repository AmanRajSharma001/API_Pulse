
const { performance } = require("node:perf_hooks");
const path = require("node:path");
const stats = require("./stats");

const publicDir = path.join(__dirname, "..", "public");

function apiPulse(req, res, next) {
    const start = performance.now();

    if (req.method === "GET" && req.path === "/stats") {
        return res.sendFile(path.join(publicDir, "index.html"));
    }

    if (req.method === "GET" && req.path === "/style.css") {
        return res.sendFile(path.join(publicDir, "style.css"));
    }

    if (req.method === "GET" && req.path === "/dashboard.js") {
        return res.sendFile(path.join(publicDir, "dashboard.js"));
    }

    if (req.method === "GET" && req.path === "/debug/stats") {
        const averageResponseTime =
            stats.totalRequests > 0
                ? stats.totalDuration / stats.totalRequests
                : 0;

        return res.json({
            ...stats,
            averageResponseTime
        });
    }

    res.on("finish", () => {
        const duration = performance.now() - start;
        const status = res.statusCode;

        stats.totalRequests++;
        stats.totalDuration += duration;

        if (status >= 200 && status < 300) {
            stats.status2xx++;
        } else if (status >= 300 && status < 400) {
            stats.status3xx++;
        } else if (status >= 400 && status < 500) {
            stats.status4xx++;
        } else if (status >= 500 && status < 600) {
            stats.status5xx++;
        }

        stats.recentRequests.unshift({
            method: req.method,
            path: req.path,
            status,
            duration: Number(duration.toFixed(2))
        });

        if (stats.recentRequests.length > 20) {
            stats.recentRequests.pop();
        }

        console.log(
            `[ApiPulse] - Method: ${req.method} - ` +
            `Path: ${req.path} - ` +
            `Status: ${status} - ` +
            `Duration: ${duration.toFixed(2)} ms`
        );
    });

    next();
}

module.exports = { apiPulse };
