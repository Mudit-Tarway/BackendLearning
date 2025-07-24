//Learned express library 

const express = require("express");

const app = express();

app.use(express.json()); // if you share the json data or const parseBody = require('body-parser') body-parser.json()
 
app.post("/sum", function(req, res) {
    console.log("Received Body " ,req.body);
    const a = parseInt(req.body.a);
    const b = parseInt(req.body.b);

    res.json({
        ans: a + b
    })
});


app.listen(3000);