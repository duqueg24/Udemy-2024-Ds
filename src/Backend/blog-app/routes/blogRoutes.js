import express from "express";
const router = express.Router();

let posts = [];
router.get("/", (req, res) => {
  res.render("index", { posts });
});

router.get("/new", (req, res) => {
  res.render("new");
});

router.post("/posts", (req, res) => {
  const { title, content } = req.body;
  posts.push({ title, content });
  res.redirect("/");
});

router.post("/posts/delete", (req, res) => {
  const index = req.body.index;
  posts.splice(index, 1);
  res.redirect("/");
});

export default router;