import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import corsOptions from "./configs/corsConfig";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors(corsOptions));

app.use(express.json());

app.get("/api/v1/inventory", (req: Request, res: Response) => {
  res.status(200).json({ data: "Data From Server" });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
