import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import corsOptions from "./configs/corsConfig";
import connectDB from "./db/connectDB";
import authenticateUser from "./middleware/authentication";
import notFoundMiddleware from "./middleware/not-found";
import errorHandlerMiddleware from "./middleware/error-handler";
import authRouter from "./routes/auth";
import inventoryRouter from "./routes/inventory";
import helmet from "helmet";
import xss from "xss-clean";
import rateLimiter from "express-rate-limit";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

process.on("uncaughtException", function (error) {
  console.log(error.stack);
});

app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

app.use(express.json());

app.use(cors(corsOptions));
app.use(cookieParser());

app.use(helmet());
app.use(xss());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/inventory", authenticateUser, inventoryRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
