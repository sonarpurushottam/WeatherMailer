import express from 'express';
import { mailWeatherDashboard } from '../controllers/mailController';

const router = express.Router();

router.post('/api/mailWeatherDashboard', mailWeatherDashboard);

export default router;
