const { name } = require("ejs");
const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));

const port = 4000;

const users = [
  { id: 1, name: "Alex Johnson", age: 25, bio: "Loves coding!" },
  { id: 2, name: "Samantha Lee", age: 30, bio: "Passionate about UI/UX!" },
  { id: 3, name: "Chris Walker", age: 28, bio: "Backend enthusiast!" },
];

app.get("/", (req, res) => {
  res.render("home", { users });
});

// app.get("/users", (req, res) => {
//   res.render("index", { users });
// });

// app.get("/users/:id", (req, res) => {
//   const user = users.find((u) => u.id === parseInt(req.params.id));
//   if (user) {
//     res.render("profile", { user });
//   } else {
//     res.status(404).send("User not found");
//   }
// });

const postRouter = require("./routes/posts");
app.use("/posts", postRouter);

app.listen(port, () => console.log(`Server running on port ${port}`));
