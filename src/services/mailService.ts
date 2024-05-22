import nodemailer from "nodemailer";
import WeatherData from "../models/WeatherData";
import dotenv from "dotenv";
dotenv.config();

async function sendWeatherEmail(
  weatherData: WeatherData[],
  recipientEmail: string
) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const weatherTableRows = weatherData
    .map(
      (data) => `
    <tr>
      <td>${data.id}</td>
      <td>${data.city}</td>
      <td>${data.country}</td>
      <td>${data.weather}</td>
      <td>${data.time}</td>
      <td>${data.longitude}</td>
      <td>${data.latitude}</td>
    </tr>
  `
    )
    .join("");

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: recipientEmail,
    subject: "Weather Dashboard Data",
    html: `
      <h1>Weather Dashboard Data</h1>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>City</th>
            <th>Country</th>
            <th>Weather</th>
            <th>Time</th>
            <th>Longitude</th>
            <th>Latitude</th>
          </tr>
        </thead>
        <tbody>
          ${weatherTableRows}
        </tbody>
      </table>
    `,
  };

  await transporter.sendMail(mailOptions);
}

export { sendWeatherEmail };
