import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { connectDB } from "./src/db/db.server.js"
import router from "./src/routes/user.routes.js"
dotenv.config()
const app = express()
connectDB()

app.use(cors()) 
const PORT = process.env.PORT

app.use(express.json())

app.use("/api/users",router)


app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})


export default app







