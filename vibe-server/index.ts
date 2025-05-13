import express from "express"; // Handles HTTP Requests, Routing System and more.
import init from "./startup/init"; // script for connecting to db and setup all endpoints / routes

const app = express();

// Initinize our app server
init(app);

// API root route
app.get("/", (req, res) => {
  res.send("Hello World! This is the API for VibeVault");
});

app.listen(5000, () => {
  console.log("Server is running on http://localhost:8080/api/");
});
