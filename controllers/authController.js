const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");

const SECRET_KEY = "your-secret-key";

exports.showRegisterForm = (req, res) => {
  res.render("register", { title: "Register" });
};

exports.register = async (req, res) => {
  const { email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  try {
    db.prepare("INSERT INTO users (email, password) VALUES (?, ?)").run(
      email,
      hashed
    );
    res.redirect("/login");
  } catch (err) {
    res.status(400).send("Email already registered.");
  }
};

exports.showLoginForm = (req, res) => {
  res.render("login", { title: "Login" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send("Invalid credentials");
  }

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
    expiresIn: "1h",
  });
  res.cookie("token", token, { httpOnly: true });
  res.redirect("/dashboard");
};

exports.authenticate = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) return res.redirect("/login");

  try {
    const user = jwt.verify(token, SECRET_KEY);
    req.user = user;
    next();
  } catch {
    res.redirect("/login");
  }
};

exports.dashboard = (req, res) => {
  res.render("dashboard", { user: req.user, title: "Dashboard" });
};
