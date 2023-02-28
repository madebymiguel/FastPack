import { Router } from "express";
import { register, login, signoff, getUserToken } from "../controllers/auth";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/signoff", signoff);
router.get("/user", getUserToken);

export default router;
