import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

app.get("/contact", (req, res) => {
  res.send("<h1>Contact Me</h1> <p>Phone: +302 412 0704</p>");
});

app.get("/about", (req, res) => {
  res.send("<h1>About Me</h1> <p>My name is Diego, i am from Colombia.</p>");
});

app.post("/register", (req, res) => {
  res.sendStatus(201);
});

app.put("/user/diego", (req, res) => {
  res.sendStatus(200);
});

app.patch("/user/diego", (req, res) => {
  res.sendStatus(200);
});

app.delete("/user/diego", (req, res) => {
  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log("Server running on port 3000.");
});
