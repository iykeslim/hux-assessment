import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"

// Routes imports
import userRoutes from "./routes/user"
import contactRouter from "./routes/contact.router" 

dotenv.config() 

const app = express()

app.use(cors())

app.use(express.json())


interface ConnectOptions {
  useNewUrlParser: boolean
  useUnifiedTopology: boolean
}

// Connect to MongoDB
const connectDB = async (): Promise<void> => {
  try {
    const uri = process.env.DB_CONNECTION_STRING! 
    await mongoose.connect(uri)
    console.log("MongoDB Database Connected...")
  } catch (error) {
    console.error("MongoDB connection error:", error)
    process.exit(1) 
  }
}

connectDB() 

// API Routes
app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello from the backend!")
})

app.use("/api/users", userRoutes)
app.use("/api/contacts", contactRouter)


// Start the server
const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
