const express = require('express');

const app = new express();

app.get("/",(req, res) =>{
    res.send("api is running")
});


app.listen(5000,console.log("Server running on port 5000"))