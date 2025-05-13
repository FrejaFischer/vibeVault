import express from "express";
// import testRouter from "../routes/testRouter";
import albumRouter from "../routes/albumRouter";

// Setup all our routes / endpoints
const setupRouters = (app: express.Application) => {
  // app.use("/test", testRouter); // Test endpoint for get and post test user
  app.use("/albums", albumRouter); // Test endpoint for getting albums
};

export default setupRouters;
