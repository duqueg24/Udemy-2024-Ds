const fs = require("fs");

// fs.writeFile("message-01.txt", "Hello from NODE JS", (error) => {
//   if (error) throw error;
//   console.log("The file has been saved!");
// });

fs.readFile("./message-01.txt", "utf8", (error, data) => {
  if (error) throw error;
  console.log(data);
});