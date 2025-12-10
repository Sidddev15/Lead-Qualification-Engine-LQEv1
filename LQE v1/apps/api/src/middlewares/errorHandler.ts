import type { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error(err);

  const status = (err as any).status ?? 500;
  const message =
    (err as any).message ?? "Internal server error in API gateway";

  res.status(status).json({
    error: {
      message,
      status,
    },
  });
};
