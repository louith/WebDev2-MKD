const express = require("express");
const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

// Temporary in-memory "database"
let users = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
];

// ROUTES

// GET: All users
app.get("/users", (req, res) => {
  res.render("index", { users });
});

// GET: New user form
app.get("/users/new", (req, res) => {
  res.render("new");
});

// POST: Create new user
app.post("/users", (req, res) => {
  const { name, email } = req.body;
  const newUser = { id: Date.now(), name, email };
  users.push(newUser);
  res.redirect("/users");
});

// GET: Edit user form
app.get("/users/:id/edit", (req, res) => {
  const user = users.find((u) => u.id == req.params.id);
  res.render("edit", { user });
});

// POST: Update user
app.post("/users/:id", (req, res) => {
  const { name, email } = req.body;
  const user = users.find((u) => u.id == req.params.id);
  if (user) {
    user.name = name;
    user.email = email;
  }
  res.redirect("/users");
});

// POST: Delete user
app.post("/users/:id/delete", (req, res) => {
  users = users.filter((u) => u.id != req.params.id);
  res.redirect("/users");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
