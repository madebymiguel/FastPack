import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import corsOptions from "./configs/corsConfig";
import connectDB from "./db/connectDB";
// import authenticateUser from "./middleware/authentication";
import notFoundMiddleware from "./middleware/not-found";
import errorHandlerMiddleware from "./middleware/error-handler";
import authRouter from "./routes/auth";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/v1/auth", authRouter);

// app.get("/api/v1/inventory", (req: Request, res: Response) => {
//   res.status(200).json({ data: "Data From Server" });
// });

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
