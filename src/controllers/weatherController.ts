import { Request, Response } from "express";
import WeatherData from "../models/WeatherData";
import { getCoordinates } from "../services/geoCodingService";
import { getWeatherData } from "../services/weatherService";

export async function saveWeatherMapping(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const cities = req.body as { city: string; country: string }[];
    const weatherDataPromises = cities.map(async (cityObj) => {
      const { city, country } = cityObj;
      try {
        const { longitude, latitude } = await getCoordinates(city, country);
        console.log(
          `Coordinates for ${city}, ${country}: ${latitude}, ${longitude}`
        );

        const weather = await getWeatherData(latitude, longitude);
        console.log(`Weather data for ${city}, ${country}: ${weather}`);

        const weatherRecord = await WeatherData.create({
          city,
          country,
          weather,
          time: new Date(),
          longitude,
          latitude,
        });
        console.log(`Data saved for ${city}, ${country}:`, weatherRecord);

        return weatherRecord;
      } catch (error) {
        console.error(`Error processing ${city}, ${country}:`, error);
        throw error;
      }
    });

    await Promise.all(weatherDataPromises);
    res.status(200).json({ message: "Weather data saved successfully" });
  } catch (error) {
    console.error("Error saving weather data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
