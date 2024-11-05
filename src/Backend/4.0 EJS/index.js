import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  const today = new Date("November 02, 2024 00:35:00");
  const day = today.getDay();

  let Type = "a weekday";
  let adv = "It's time to work hard.";

  if (day === 0 || day === 6) {
    Type = "the weekend";
    adv = "It's time to have fun.";
  }


  // console.log(day);
  res.render("index.ejs", {
    dayType: "a weekday",
    advice: "It's time to work hard.",
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
