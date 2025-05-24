import { Application, json } from "express";
import cors from "cors";
import dbConnectPostgress from "./dbConnection";
import setupRouters from "./setupRouters";
import cookieParser from "cookie-parser";

const init = (app: Application) => {
  app.use(cors()); // Enable CORS for all requests to the server
  app.use(cookieParser()); // Enable a cookie parser to get cookies in request
  app.use(json()); // Enable JSON parsing for all requests to the server

  dbConnectPostgress(); // Connect to the Postgres database
  setupRouters(app); // Setup all routers for the server
};

export default init;
