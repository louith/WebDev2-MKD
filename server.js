const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");

const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", authRoutes);

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
