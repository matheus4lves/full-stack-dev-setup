// Invoke the Express module
const express = require("express");
// Invoke helmet
const helmet = require("helmet");

// Use the Express module to create a server
const app = express();

// Use helmet
app.use(helmet());

// Serve up static files
app.use(express.static("public"));

// Parse json and urlencoded data into req.body
app.use(express.json());
app.use(express.urlencoded());

// Sanit check
app.get("/sanit-check", (req, res) => {
  res.send("<h1>Welcome to the <em>back-end</em></h1>");
});

app.get("/", (req, res, next) => {
  res.json({
    name: "Giovani Georgio",
  });
});

// Put it to listen on port 8080
app.listen(8080, () => {
  console.log("Server listening on port 8080");
});
