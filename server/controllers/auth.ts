import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import cookie from "cookie";
import { BadRequestError, UnauthenticatedError } from "../errors";
import User from "../models/User";

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await User.create({ ...req.body });
    const token = user.createJWT();

    res.setHeader(
      "Set-Cookie",
      cookie.serialize(`${process.env.COOKIE_NAME}`, token, {
        httpOnly: true,
        maxAge: 8 * 60 * 60,
        path: "/",
        sameSite: "none",
        secure: true,
      })
    );

    res.status(StatusCodes.CREATED).json({ user: { email: user.email } });
  } catch (error) {
    next(error);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new BadRequestError("Please Provide Email And Password");
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new UnauthenticatedError("Invalid Credentials");
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new UnauthenticatedError("Invalid Credentials");
    }

    const token = user.createJWT();

    res.setHeader(
      "Set-Cookie",
      cookie.serialize(`${process.env.COOKIE_NAME}`, token, {
        httpOnly: true,
        maxAge: 8 * 60 * 60,
        path: "/",
        sameSite: "none",
        secure: true,
      })
    );

    res.status(StatusCodes.OK).json({ user: { email: user.email }, token });
  } catch (error) {
    next(error);
  }
}

export async function signoff(req: Request, res: Response, next: NextFunction) {
  try {
    res.setHeader(
      "Set-Cookie",
      cookie.serialize(`${process.env.COOKIE_NAME}`, "", {
        httpOnly: true,
        maxAge: -1,
        path: "/",
        sameSite: "none",
        secure: true,
      })
    );

    res.status(StatusCodes.OK).json({ msg: "Successfully logged out" });
  } catch (error) {
    next(error);
  }
}

export async function getUserToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const cookies = cookie.parse(req.headers.cookie || "");
  const token = cookies[`${process.env.COOKIE_NAME}`];

  if (token) {
    res.status(StatusCodes.OK).json({ token: token });
  } else {
    res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Token does not exist" });
  }
}
