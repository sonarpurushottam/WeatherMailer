import express from "express";
import dotenv from "dotenv";
dotenv.config(); 

import weatherRouter from "./routes/weatherRoutes";
import dashboardRouter from "./routes/dashboardRoutes";
import mailRouter from "./routes/mailRoutes";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(weatherRouter);
app.use(dashboardRouter);
app.use(mailRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

