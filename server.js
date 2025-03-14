const { name } = require("ejs");
const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.set("views", "./views");
const port = 4000;

app.get("/", (req, res) => {
  const users = ["Alice", "Bob", "Charlie"];
  res.render("index", { users });
});

app.get("/users", (req, res) => {
  res.json({
    message: "Fetching users",
    status: res.statusCode,
  });
});

app.get("/users/:id", (req, res) => {
  let id = req.params.id;
  res.send(`User ID ${id}`);
});

app.listen(port, () => console.log(`Server running on port ${port}`));
