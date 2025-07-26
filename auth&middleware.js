const express = require("express");

const app = express();

const jwt = require("jsonwebtoken");

const SECRET_TOKEN = "mYhELLOWORLD";

app.use(express.json());

const users = [];


function auth(req , res ,next){
    const token = req.headers.token;
    const decodeInfo = jwt.verify(token, SECRET_TOKEN);

    if(decodeInfo.username){
        req.username = decodeInfo.username
        next();
    }else{
        res.json({
            message : "You are not logged in!!"
        })
    }
}

app.post("/signup", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  users.push({
    username: username,
    password: password,
  });

  res.json({
    message: "You are signed in Congratulations!!",
  });

  console.log(users);
});

app.post("/signin", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  let userFoundName = null;

  for (let i = 0; i < users.length; i++) {
    if (users[i].username === username && users[i].password === password) {
      userFoundName = users[i];
    }
  }

  if (userFoundName) {
    const token = jwt.sign(
      {
        username: username,
      },
      SECRET_TOKEN
    );
    res.json({
        token : token
    })
  } else {
    res.status(403).send({
      message: "Invalid username or password",
    });
  }

  console.log(users);
});

app.get("/me", auth , function (req, res) {

  let foundUser = null;

  for (let i = 0; i < users.length; i++) {
    if (users[i].username === req.username) {
      foundUser = users[i];
    }
  }
  if (foundUser) {
    res.json({
      username: foundUser.username,
      password: foundUser.password,
    });
  } else {
    res.json({
      message: "Invalid Token",
    });
  }
});

app.listen(3000);