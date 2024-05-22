import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const GEOCODING_API_URL = "https://api.api-ninjas.com/v1/geocoding";

export async function getCoordinates(
  city: string,
  country: string
): Promise<{ longitude: number; latitude: number }> {
  try {
    const response = await axios.get(GEOCODING_API_URL, {
      params: {
        city,
        country,
      },
      headers: {
        "X-Api-Key": process.env.GEOCODING_API_KEY,
      },
    });

    console.log(
      `GeoCoding API response for ${city}, ${country}:`,
      response.data
    );

    if (response.data.length === 0) {
      throw new Error(`No coordinates found for ${city}, ${country}`);
    }

    const { longitude, latitude } = response.data[0];

    return { longitude, latitude };
  } catch (error: any) {
    console.error(
      "Error fetching coordinates from GeoCoding API:",
      error.response ? error.response.data : error
    );
    throw new Error("Error fetching coordinates from GeoCoding API");
  }
}
