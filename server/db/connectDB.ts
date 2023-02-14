import { connect, set } from "mongoose";

export default function connectDB() {
  set("strictQuery", false);
  return connect(`${process.env.MONGO_URI}`);
}
