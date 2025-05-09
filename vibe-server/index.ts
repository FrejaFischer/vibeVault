import express from "express";
// import init from "./startup/init"; // When we have the init script for connecting to db

const app = express();

// init(app);

app.get("/", (req, res) => {
  res.send("Hello World! This is the API for VibeVault");
});

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
