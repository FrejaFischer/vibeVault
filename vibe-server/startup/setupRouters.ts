import express from "express";
import testRouter from "../routes/testRouter";

// Setup all our routes / endpoints
const setupRouters = (app: express.Application) => {
  app.use("/test", testRouter); // Test endpoint for get and post test user
};

export default setupRouters;
