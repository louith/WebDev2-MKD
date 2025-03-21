const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Posts home page");
});

router.get("/new", (req, res) => {
  res.send("New posts here");
});

router.get("/:id", (req, res) => {
  res.send(`Post with ID ${req.params.id}`);
});

module.exports = router;
