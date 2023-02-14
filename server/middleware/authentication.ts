import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors";

export default async function Authentication(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Authentication Invalid");
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, `${process.env.JWT_SECRET}`);

    req["user"] = { userId: payload["userId"], name: payload["name"] };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication Invalid");
  }
}
