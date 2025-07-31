const express = require('express');

const {UserModel , TodoModel} = require("./db");

const app = express();

app.use(express.json());

const jwt = require('jsonwebtoken');

const { default: mongoose } = require('mongoose');

const JWT_SECRET = "HELLOTodos";

mongoose.connect("mongodb+srv://mudittarway1234:SACHIT@cluster0.lx2rr1c.mongodb.net/TODO-MUDIT-2345444");

app.post('/signup', async function(req,res){
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    await UserModel.create({
       email : email , 
       password : password,
       name : name
    })

    res.json({
        message : "You are signup"
    })
})

app.post('/signin', async function(req,res){
    const email = req.body.email;
    const password = req.body.password;

    const user = await  UserModel.findOne({
        email : email, 
        password : password
    })

    if(user){
        const token = jwt.sign({
            id : user._id.toString()
        },JWT_SECRET);

        res.json({
            token : token
        })
    }else{
        res.status(403).json({
            message : "Incorrect Credentials"
        })
    }
})

app.post('/todo', auth , function(req,res){
    const userId = req.userId;

    res.json({
        userId : userId
    })

})

app.get('/todos', auth , function(req,res){

const userId = req.userId;

    res.json({
        userId : userId
    })
})

function auth(req , res , next){
    const token = req.headers.token;

    const decoded = jwt.verify(token , JWT_SECRET);

    if(decoded){
        req.userId = decoded.id;
        next();
    }else{
        res.status(403).json({
            message : "Invalid credentials"
        })
    }
}

app.listen(3000);