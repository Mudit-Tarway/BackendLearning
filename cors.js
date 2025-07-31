const express = require('express');

const cors = require('cors');

app.use(cors());

app.post('/sum' , function(req,res){
    const a = parseInt(req.body.a);
    const b = parseInt(req.body.b);
    res.json({
        ans : a + b
        message : "You are signup"
    })
})

app.listen(3000);
