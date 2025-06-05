import { Application, json } from "express";
import cors from "cors";
import dbConnectPostgress from "./dbConnection";
import setupRouters from "./setupRouters";
import cookieParser from "cookie-parser";

// CORS middleware - Checks list of allowed origins from env
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [];

const corsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    if (!origin) {
      return callback(null, true); // allow tools like Postman
    }
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS_NOT_ALLOWED"));
    }
  },
  credentials: true, // Accepts cookies being sent along the request
};

const init = (app: Application) => {
  // Set CORS rules to only accept requests from the allowed list
  app.use((req, res, next) => {
    cors(corsOptions)(req, res, (err) => {
      if (err?.message === "CORS_NOT_ALLOWED") {
        return res.status(403).json({ error: "Access denied by CORS policy" });
      }
      next(err); // Continue to next middleware or error handler
    });
  });
  app.use(cookieParser()); // Enable a cookie parser to get cookies in request
  app.use(json()); // Enable JSON parsing for all requests to the server

  dbConnectPostgress(); // Connect to the Postgres database
  setupRouters(app); // Setup all routers for the server
};

export default init;
