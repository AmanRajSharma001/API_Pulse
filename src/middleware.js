const {performance} = require("node:perf_hooks"); //Node.js Build-in Performance Hook

function apiPulse(req,res,next){
    const start = performance.now();
    res.on("finish",()=>{
        const duration = performance.now()-start;
        console.log(`[API_Pulse] - Method : ${req.method} - Path : ${req.path} - Duration : ${duration.toFixed(2)}ms`);
    })
    next();
}

module.exports = {apiPulse};
