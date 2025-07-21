const express = require('express');
const app = express();

app.get('/multiply', function(req, res) {
    const num1 = Number(req.query.num1);
    const num2 = Number(req.query.num2);
    const value1 = num1 * num2;
    res.json({
        Multiply: value1
    });
});

app.get('/add', function(req, res) {
    const num1 = Number(req.query.num1);
    const num2 = Number(req.query.num2);
    const value2 = num1 + num2;
    res.json({
        Addition: value2
    });
});

app.get('/division', function(req, res) {
    const num1 = Number(req.query.num1);
    const num2 = Number(req.query.num2);
    if (num2 === 0) {
        res.json({
            msg: "Division by zero is not possible"
        });
        return;
    }
    const value3 = num1 / num2;
    res.json({
        Division: value3
    });
});

app.get('/subtract', function(req, res) {
    const num1 = Number(req.query.num1);
    const num2 = Number(req.query.num2);
    const value4 = num1 - num2;
    res.json({
        Subtract: value4
    });
});

app.listen(3000);
