import express from "express"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"
import cors from "cors"
import { connectDB } from "./src/db/db.server.js"
import router from "./src/routes/user.routes.js"
dotenv.config()
const app = express()
connectDB()

app.use(cors()) 
const PORT = process.env.PORT

app.use(express.json())


// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



// Static folder for serving images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use("/api/users",router)


app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})


export default app







