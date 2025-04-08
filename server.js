const express = require("express");
const axios = require("axios");
const { name } = require("ejs");
const app = express();
const port = 3000;

//set EJS as the templating engine
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json()); // Middleware to parse JSON bodies

const users = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Anne Klutz" },
  { id: 3, name: "Hi" },
];

app.get("/", (req, res) => {
  res.send("Homepage");
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).send("User not found");
  }
});

//create new user
app.post("/users", (req, res) => {
  const newUser = {
    id: req.body.id,
    name: req.body.name,
  };
  // Normally, you would save this user to a database
  users.push(newUser);
  // For this example, we'll just push it to the array
  res.status(201).json(newUser);
});

//update
app.put("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (user) {
    user.id = req.body.id; // Update the user ID (if needed)
    user.name = req.body.name;
    res.json(user);
  } else {
    res.status(404).send("User not found");
  }
});

app.delete("/users/:id", (req, res) => {
  const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (userIndex !== -1) {
    users.splice(userIndex, 1); // Remove the user from the array
    res.send("User deleted");
  } else {
    res.status(404).send("User not found");
  }
});

// const postRouter = require("./routes/posts");
// app.use("/posts", postRouter);

app.listen(port, () => console.log(`Server running on port ${port}`));
