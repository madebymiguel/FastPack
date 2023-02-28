import cors from "cors";

const allowedOrigins = [
  "http://localhost:5173",
  "https://fastpack.onrender.com",
];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
  credentials: true,
};

export default options;
