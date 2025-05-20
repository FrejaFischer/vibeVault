import { Application, json } from "express";
import cors from "cors";
import dbConnectPostgress from "./dbConnection";
import setupRouters from "./setupRouters";

const init = (app: Application) => {
  app.use(cors()); // Enable CORS for all requests to the server
  app.use(json()); // Enable JSON parsing for all requests to the server

  dbConnectPostgress(); // Connect to the Postgres database
  setupRouters(app); // Setup all routers for the server
};

export default init;
