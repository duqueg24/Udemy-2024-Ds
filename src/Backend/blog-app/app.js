import express from "express";
import blogRoutes from "./routes/blogRoutes.js";

const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.use("/", blogRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
