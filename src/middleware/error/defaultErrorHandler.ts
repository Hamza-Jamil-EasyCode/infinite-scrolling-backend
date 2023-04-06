import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

// Express requires all the input variables to be declared even if they are not used
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handler: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log(err.name);

  res.status(err.status || 500).json({
    message: err?.message || "Internal server error",
    details: err,
  });
};
