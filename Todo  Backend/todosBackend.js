const express = require('express');
const { UserModel, TodoModel } = require("./db");
const app = express();
app.use(express.json());
const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');
const JWT_SECRET = "HELLOTodos";
const bcrypt = require('bcrypt');
const { z } = require('zod');

// Connect to MongoDB
mongoose.connect("mongodb+srv://mudittarway1234:SACHIT@cluster0.lx2rr1c.mongodb.net/TODO-MUDIT-2345444");

// AUTH MIDDLEWARE
function auth(req, res, next) {
  const token = req.headers.token;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid credentials" });
  }
}

// SIGNUP ROUTE
app.post('/signup', async function (req, res) {
  const userSchema = z.object({
    email: z.string().min(5).max(50).email(),
    password: z.string()
      .min(8, "Password must be at least 8 characters")
      .max(16, "Password must be at most 16 characters")
      .regex(/[A-Z]/, "Password must include at least one uppercase letter")
      .regex(/[a-z]/, "Password must include at least one lowercase letter")
      .regex(/[0-9]/, "Password must include at least one digit")
      .regex(/[^A-Za-z0-9]/, "Password must include at least one special character"),
    name: z.string().min(5)
  });

  const parsedData = userSchema.safeParse(req.body);

  if (!parsedData.success) {
    return res.status(400).json({
      message: "Incorrect format",
      error: parsedData.error.issues.map(issue => issue.message),
    });
  }

  const { email, password, name } = parsedData.data;

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      email,
      password: hashedPassword,
      name,
    });
    await newUser.save();
    res.status(201).json({ message: "Signed Up!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error signing up user" });
  }
});

// SIGNIN ROUTE
app.post('/signin', async function (req, res) {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (isPasswordCorrect) {
        const token = jwt.sign({ id: user._id.toString() }, JWT_SECRET);
        return res.status(200).json({ token });
      }
    }
    res.status(403).json({ message: "Incorrect Credentials" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error signing in" });
  }
});

// CREATE TODO
app.post('/todo', auth, async function (req, res) {
  try {
    const userId = req.userId;
    const { title, done } = req.body;

    const todo = new TodoModel({
      title,
      done,
      userId,
    });

    await todo.save();
    res.status(201).json({ message: "Todo created..." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Couldn't create todo..." });
  }
});

// GET TODOS
app.get('/todos', auth, async function (req, res) {
  try {
    const userId = req.userId;
    const todos = await TodoModel.find({ userId });

    if (todos.length === 0) {
      res.status(404).json({ message: "No todos found for this user" });
    } else {
      res.status(200).json({ todos });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Couldn't get todos..." });
  }
});

// SERVER
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
