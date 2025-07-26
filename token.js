const express = require('express');

const app = express();

app.use(express.json());

const users = [] ;

function generateToken()
{
    let options = ['a','b', 'c', 'd', 'e' , 'f', 'g', 'h' , 'i',
    'j' , 'k' , 'l' , 'm' , 'n', 'T' , 'U', 'V', 'W', 'X', 
    'Y', 'Z', '0', '1','2', '3', '4'];

    let token = "";
    for (let i = 0; i < 32; i++) {
        token += options [Math. floor(Math. random() * options.length)];
    }
    return token;
}

app.post("/signup",function(req,res){ 
    const username = req.body.username;
    const password = req.body.password;

    users.push(
        {
            username: username,
            password: password
        }
    )

    res.json({
        message : "You are signed in"
    })

    console.log(users)
})

app.post("/signin",function(req,res){
    const username = req.body.username;
    const password = req.body.password;

    const founduser = users.find(function(u){
        if(u.username == username && u.password == password){
            return true;
        }else{
            return false;
        }
    })

    if(founduser){
        const token = generateToken();
        founduser.token = token;
        res.json({
            token : token
        })
    }else{
        res.status(403).send({
            message: "Invalid username or password"
        })
    }

    console.log(users);


})

app.get("/me" , function(req , res){
    const userToken = req.headers.token;
    let foundUser = null;
    for(let i=0;i<users.length;i++){
        if(users[i].token == userToken){
            foundUser = users[i];
        }
    }
if(foundUser){
    res.json({
        username :  foundUser.username ,
        password : foundUser.password
    })
}else{
    res.json({
        message : "Invalid Token"
    })
}

})


app.listen(3000);