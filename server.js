const { name } = require("ejs");
const express = require("express");
const axios = require("axios");
const app = express();
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));

const port = 4000;

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    res.render("index", { posts: response.data });
  } catch (error) {
    res.status(500).send("Error fetching data");
  }
});

app.get("/posts", async (req, res) => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    res.render("index", { posts: response.data });
  } catch (error) {
    res.status(500).send("Error fetching data");
  }
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

// const postRouter = require("./routes/posts");
// app.use("/posts", postRouter);

app.listen(port, () => console.log(`Server running on port ${port}`));
