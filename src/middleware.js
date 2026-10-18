const {performance} = require("node:perf_hooks"); //Node.js Build-in Performance Hook
const stats = require("./stats");

function apiPulse(req, res, next) {
    const start = performance.now();
    res.on("finish", () => {
        const ignoredPaths = [
            "/stats",
            "/debug/stats",
            "/dashboard.js",
            "/dashboard.css",
            "/favicon.ico",
            "/apple-touch-icon.png",
            "/apple-touch-icon-precomposed.png"
        ];

        if (ignoredPaths.includes(req.path)) {
            return;
        }

        const duration = performance.now() - start;
        const status = res.statusCode;

        stats.totalRequests++;
        stats.totalDuration += duration;

        if (status >= 200 && status < 300) {
            stats.status2xx++;
        } else if (status >= 400 && status < 500) {
            stats.status4xx++;
        } else if (status >= 500 && status < 600) {
            stats.status5xx++;
        }

        stats.recentRequests.unshift({ //start of the array me add karta data
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
