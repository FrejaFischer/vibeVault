import { Application } from "express";
// import testRouter from "../routes/testRouter";
import albumRouter from "../routes/albumRouter";
import entryRouter from "../routes/entryRouter";
import artistRouter from "../routes/artistRouter";
import trackRouter from "../routes/trackRouter";
import userRouter from "../routes/userRouter";
import loginRouter from "../routes/loginRouter";
import authRouter from "../routes/authRouter";
import logoutRouter from "../routes/logoutRouter";

// Setup all our routes / endpoints
const setupRouters = (app: Application) => {
  // app.use("/test", testRouter); // Test endpoint for get and post test user (dont work anymore)
  app.use("/artists", artistRouter); // Test endpoint for getting artists
  app.use("/albums", albumRouter); // Test endpoint for getting albums
  app.use("/tracks", trackRouter); // Test endpoint for getting songs
  app.use("/users/:user_id/entries", entryRouter); // Endpoint for getting users entries, :user_id is a route param
  app.use("/entries", entryRouter); // Endpoint for getting all entries
  //app.use("/users/:user_id/entries/:entry_id", entryRouter); // Endpoint for getting a specific entry
  app.use("/users", userRouter); // Endpoint for users (insert + get by id)
  app.use("/login", loginRouter); // Endpoint for login
  app.use("/auth/check", authRouter); // Endpoint for checking authentication in server
  app.use("/logout", logoutRouter); // Endpoint for logout
};

export default setupRouters;
