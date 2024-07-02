import express, {Request, Response} from "express"
import cors from "cors"
import helmet from "helmet"
import rateLimit from "express-rate-limit"
import http from "http"
import config from "./config/config"
import getLocation from "./utils/get-location"
import getTemp from "./utils/get-temp"

const app = express()


const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 100,
	legacyHeaders: false,
})

app.use(limiter)
app.use(cors({ origin: "*"}))
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.get("/", async(req: Request, res: Response)=>{
    const {visitor_name } = req.query
    if(!visitor_name)return res.status(400).json({message: "visitor_name is required"})
    
    const client_ip = req.socket.remoteAddress;
    try{
        const locationInfo = await getLocation(client_ip!.toString())
        const temperature = await getTemp(locationInfo.city)
        const greeting = `Hello, ${visitor_name}!, the temperature is ${temperature} degrees Celcius in ${locationInfo.city}`
        return res.status(200).json({client_ip, location: locationInfo.city, greeting})
    }catch(err: any){
        const message = err.message || `failed to fetch location and temperature for ip ${client_ip}`
        return res.status(400).json({message})
    }
})

function start(){
    const server = http.createServer(app)
    server.listen(config.app.port, ()=>{
        console.log(`server running ${config.app.env} mode on port ${(server.address() as {port: number}).port}...`)
    })
    return server
}

const server = start()

export default server