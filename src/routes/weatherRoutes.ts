import express from "express";
import { saveWeatherMapping } from "../controllers/weatherController";

const weatherRouter = express.Router();

weatherRouter.post("/api/SaveWeatherMapping", saveWeatherMapping);

export default weatherRouter;
