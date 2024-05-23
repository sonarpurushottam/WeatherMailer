# 1-Weather fetching and storing api using sequelize

## POST API route → 
http://localhost:3000/api/SaveWeatherMapping

## GeoCoding URL → 
https://api-ninjas.com/api/geocoding

## WeatherAPI URL → 
https://rapidapi.com/weatherapi/api/weatherapi-com/

## Request Body ↓

{[
{
"city":"Pune",
"country":"India"
},
{
"city":"Mumbai",
"country":"India"
},
{
"city":"London",
"country":"England"
}
]
}

## Database Structure 
id | city | country | weather | time(Time at which data is saved) | Longitude | Latitude

# 2-Dashboard API that will be fetching the weather information from the database

## GET request route → 
http://localhost:3000/api/weatherDashboard                   (for all cities)
http://localhost:3000/api/weatherDashboard?city=cityName     (for specific city)

# 3-Mailing API 
## POST Method
http://localhost:3000/api/mailWeatherDashboard

## Request Body ↓
{
  "recipientEmail": "example@gmail.com"
}

