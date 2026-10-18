const {performance} = require("node:perf_hooks"); //Node.js Build-in Performance Hook

function apiPulse(req,res,next){
    const start = performance.now();
    res.on("finish",()=>{
        const duration = performance.now()-start;
        console.log(
            `[ApiPulse] - Method: ${req.method} - ` +
            `Path: ${req.path} - ` +
            `Status: ${res.statusCode} - ` +
            `Duration: ${duration.toFixed(2)} ms`
        );    
    })
    next();
}

module.exports = {apiPulse};
