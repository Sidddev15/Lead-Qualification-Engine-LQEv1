import express from "express";
import cors from "cors";
import { env } from "./config/env";
import { errorHandler } from "./middlewares/errorHandler";
import healthRouter from "./routes/health";

const app = express();

app.use(
  cors({
    origin: "*", // tighten later
    credentials: false,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", healthRouter);

app.use(errorHandler);

app.listen(env.port, () => {
  console.log(
    `[API] Listening on http://localhost:${env.port} (worker: ${env.lqeWorkerUrl})`
  );
});
