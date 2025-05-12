import express from "express";
import testRouter from "../routes/testRouter";

// Setup all our routes / endpoints
const setupRouters = (app: express.Application) => {
  app.use("/test", testRouter); // Test endpoint
};

export default setupRouters;
