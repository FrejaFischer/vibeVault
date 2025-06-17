import { Application, json } from "express";
import cors from "cors";
import dbConnectPostgress from "./dbConnection";
import setupRouters from "./setupRouters";
import cookieParser from "cookie-parser";
import { corsOptions } from "../middleware/handleCorsOptions";

const init = (app: Application) => {
  // Set CORS rules
  app.use((req, res, next) => {
    cors(corsOptions)(req, res, (err) => {
      if (err?.message === "CORS_NOT_ALLOWED") {
        return res.status(403).json({ error: "Access denied by CORS policy" });
      }
      next(err); // Continue to next middleware or error handler
    });
  });

  // Enable a cookie parser to get cookies in request
  app.use(cookieParser());

  // Enable JSON parsing for all requests to the server
  app.use(json());

  // Prevent caching of routes
  app.use((req, res, next) => {
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("Pragma", "no-cache");
    next();
  });

  // Connect to the Postgres database
  dbConnectPostgress();

  // Setup all routers for the server
  setupRouters(app);
};

export default init;
