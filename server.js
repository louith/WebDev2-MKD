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

app.get("/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
    res.render("post", { post: response.data });
  } catch (error) {
    res.status(500).send("Error fetching post details");
  }
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

// const postRouter = require("./routes/posts");
// app.use("/posts", postRouter);

app.listen(port, () => console.log(`Server running on port ${port}`));
