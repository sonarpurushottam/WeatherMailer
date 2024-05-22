import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const WEATHER_API_URL = "https://weatherapi-com.p.rapidapi.com/current.json";

export async function getWeatherData(
  latitude: number,
  longitude: number
): Promise<string> {
  try {
    const response = await axios.get(WEATHER_API_URL, {
      params: {
        q: `${latitude},${longitude}`,
      },
      headers: {
        "X-RapidAPI-Key": process.env.WEATHER_API_KEY,
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
      },
    });

    console.log(
      `Weather API response for ${latitude}, ${longitude}:`,
      response.data
    );

    if (!response.data || !response.data.current) {
      throw new Error("Invalid response from weather API");
    }

    return response.data.current.condition.text;
  } catch (error) {
    console.error("Error fetching weather data from WeatherAPI:", error);
    throw new Error("Error fetching weather data from WeatherAPI");
  }
}
