import axios from "axios"
import config from "../config/config";

export default async(city: string)=>{
    try{
    const weatherResponse = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${config.openWeather.token}`);
    const temperature = weatherResponse.data.main.temp;
    return temperature
    }catch(err){
        throw err
    }
}