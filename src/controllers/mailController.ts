import { Request, Response } from "express";
import WeatherData from "../models/WeatherData";
import { Op } from "sequelize";
import { sendWeatherEmail } from "../services/mailService";

export async function mailWeatherDashboard(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { city, recipientEmail } = req.body;

    if (!recipientEmail) {
      res.status(400).json({ error: "Recipient email is required" });
      return;
    }

    let weatherData;

    if (city) {
      weatherData = await WeatherData.findAll({
        where: {
          city: {
            [Op.iLike]: `%${city}%`,
          },
        },
        order: [["time", "DESC"]],
      });
    } else {
      weatherData = await WeatherData.findAll({
        attributes: [
          "id",
          "city",
          "country",
          "weather",
          "time",
          "longitude",
          "latitude",
        ],
        order: [["time", "DESC"]],
        group: [
          "id",
          "city",
          "country",
          "weather",
          "time",
          "longitude",
          "latitude",
        ],
      });
    }

    await sendWeatherEmail(weatherData, recipientEmail);

    res.status(200).json({ message: "Weather data emailed successfully" });
  } catch (error) {
    console.error("Error sending weather data email:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
