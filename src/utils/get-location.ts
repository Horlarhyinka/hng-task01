import axios from "axios"
import config from "../config/config"

export default async(ip: string)=>{
    try{
        const response = await axios.get(`${config.ipInfo.url}/${ip}/?token=${config.ipInfo.token}`)
            return response.data
    }catch(err){
        console.log("failed to get location")
    }
    
}