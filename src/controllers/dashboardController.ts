import { Request, Response } from "express";
import WeatherData from "../models/WeatherData";
import { Op } from "sequelize";
import sequelize from "sequelize";

export async function getWeatherDashboard(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { city } = req.query;

    if (city) {
      const weatherData = await WeatherData.findAll({
        where: {
          city: {
            [Op.iLike]: `%${city}%`,
          },
        },
        order: [["time", "DESC"]],
      });

      res.status(200).json(weatherData);
    } else {
      const latestWeatherData = await WeatherData.findAll({
        attributes: [
          "id",
          "city",
          "country",
          "weather",
          [sequelize.fn("max", sequelize.col("time")), "date"],
        ],
        group: ["id", "city", "country", "weather"],
      });

      res.status(200).json(latestWeatherData);
    }
  } catch (error) {
    console.error("Error fetching weather dashboard data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
