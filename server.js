const express = require("express");
const app = express();
const PORT = 3000;
const db = require("./db");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

// ROUTES

// GET: All users
app.get("/users", (req, res) => {
  const users = db.prepare("SELECT * FROM users").all();
  res.render("index", { users });
});

// GET: New user form
app.get("/users/new", (req, res) => {
  res.render("new");
});

// POST: Create new user
app.post("/users", (req, res) => {
  const { name, email } = req.body;
  db.prepare("INSERT INTO users (name, email) VALUES (?, ?)").run(name, email);
  res.redirect("/users");
});

// GET: Edit user form
app.get("/users/:id/edit", (req, res) => {
  const user = db
    .prepare("SELECT * FROM users WHERE id = ?")
    .get(req.params.id);
  res.render("edit", { user });
});

// POST: Update user
app.post("/users/:id", (req, res) => {
  const { name, email } = req.body;
  db.prepare("UPDATE users SET name = ?, email = ? WHERE id = ?").run(
    name,
    email,
    req.params.id
  );
  res.redirect("/users");
});

// POST: Delete user
app.post("/users/:id/delete", (req, res) => {
  db.prepare("DELETE FROM users WHERE id = ?").run(req.params.id);
  res.redirect("/users");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

//to check your db's content via the web
app.get("/debug", (req, res) => {
  const users = db.prepare("SELECT * FROM users").all();
  res.json(users);
});
