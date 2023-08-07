import express from "express";
import authControllers from "../../controllers/auth-controllers.js";
export const router = express.Router();

router.post("/signup", authControllers.signup);
