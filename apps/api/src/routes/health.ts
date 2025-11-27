import { Router } from "express";
import axios from "axios";
import { env } from "../config/env";

const router = Router();

router.get("/health", async (_req, res) => {
  let workerStatus: "up" | "down" | "unknown" = "unknown";

  try {
    const resp = await axios.get(`${env.lqeWorkerUrl}/health`, {
      timeout: 1000,
    });
    workerStatus = resp.status === 200 ? "up" : "down";
  } catch {
    workerStatus = "down";
  }

  res.json({
    api: "ok",
    worker: workerStatus,
    nodeEnv: env.nodeEnv,
  });
});

export default router;
