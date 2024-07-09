const express = require("express");
const app = express();

// Logging middleware function
function logger(req,res,next){
    const start = Date.now()// saart time of request

    //Log request method,URL, and timestamp
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)

    // Function to execute once the response is sent
    res.on("finish",()=>{
        const end = Date.now();//End time of request
        const duration = end - start; // Duration of request in milisecond

        // Log time taken for processing the request
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - ${duration}ms`);
    })
    next();// Call the next middleware in the stack
}

// Using the logging middleware for all routes
app.use(logger);

//routes
app.get("/product",(req,res)=>{
   res.send("Hello World!")
})

app.listen("6000",()=>{
    console.log("Server is running on port 6000");
})