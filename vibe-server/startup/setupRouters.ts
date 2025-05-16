import express from "express";
// import testRouter from "../routes/testRouter";
import albumRouter from "../routes/albumRouter";
import entryRouter from "../routes/entryRouter";

// Setup all our routes / endpoints
const setupRouters = (app: express.Application) => {
  // app.use("/test", testRouter); // Test endpoint for get and post test user (dont work anymore)
  app.use("/albums", albumRouter); // Test endpoint for getting albums
  app.use("/users/:user_id/entries", entryRouter); // Endpoint for getting users entries, :user_id is a route param
};

export default setupRouters;
