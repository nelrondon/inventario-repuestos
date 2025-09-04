import { Router } from "express";
import { AuthRepository } from "../repositories/auth.js";

const router = Router();

router.post("/login", AuthRepository.login);
router.post("/register", AuthRepository.register);

router.get("/verify", AuthRepository.verify);
router.get("/logout", AuthRepository.logout);

export default router;
