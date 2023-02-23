import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

interface CustomError {
  statusCode: number;
  msg: string;
}

export default function errorHandlerMiddleware(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(err);

  let customError: CustomError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something Went Wrong Try Again Later",
  };

  if (err.name === "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((item: any) => item.message)
      .join(",");
    customError.statusCode = 400;
  }

  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate Value Entered For ${Object.keys(
      err.keyValue
    )} Field, Please Choose Another Value`;
    customError.statusCode = 400;
  }

  if (err.name === "CastError") {
    customError.msg = `No Item Found With ID : ${err.value}`;
    customError.statusCode = 404;
  }

  return res.status(customError.statusCode).json({ msg: customError.msg });
}
