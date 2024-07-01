import dotenv from "dotenv"

dotenv.config()

const app = {
    port: process.env.PORT || 3001,
    env: process.env.NODE_ENV || "development"
}

const ipInfo = {
    url: process.env.IP_INFO_URL || "https://ipinfo.io",
    token: process.env.IP_INFO_TOKEN
}

const openWeather = {
    url: process.env.OPEN_WEATHER_URL,
    token: process.env.OPENWEATHER_TOKEN
}

export default {app, ipInfo, openWeather}