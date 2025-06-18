import { Application } from "express";
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
  app.use("/artists", artistRouter);
  app.use("/albums", albumRouter);
  app.use("/tracks", trackRouter);
  app.use("/entries", entryRouter);
  app.use("/users", userRouter);
  app.use("/login", loginRouter);
  app.use("/auth/check", authRouter);
  app.use("/logout", logoutRouter);
};

export default setupRouters;
