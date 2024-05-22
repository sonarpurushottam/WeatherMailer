import express from 'express';
import { getWeatherDashboard } from '../controllers/dashboardController';

const router = express.Router();

router.get('/api/weatherDashboard', getWeatherDashboard);

export default router;
