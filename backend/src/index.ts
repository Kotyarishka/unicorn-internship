import express, { json, urlencoded } from "express";
import cors from "cors";

import { env } from "./constans/env";
import connectToDb from "./config/db";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/errorHandler";
import authRoutes from "./routes/auth.route";
import authenticate from "./middleware/authenticate";
import userRoutes from "./routes/user.route";
import sessionRoutes from "./routes/session.route";
import providerRoutes from "./routes/provider.route";
import morgan from "morgan";

const app = express();

app.use(morgan(env.NODE_ENV === "development" ? "dev" : "combined"));

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(
  cors({
    origin: env.APP_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/auth", authRoutes);
app.use("/user", authenticate(), userRoutes);
app.use("/sessions", authenticate(), sessionRoutes);
app.use("/providers", providerRoutes);

// @ts-expect-error I'm not battling with exress one more time. Enough is enough
app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);

  connectToDb();
});
