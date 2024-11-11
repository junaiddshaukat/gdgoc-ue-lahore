import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config(); // Load environment variables
import mongodbconnection from "./mongodb-connection.js";
import { upcomingeventRouter } from "./Route/upcomingevent_Route.js";
import { teamrouter } from "./Route/TeamRoute.js";
mongodbconnection();



const app = express();
const port = process.env.PORT || 3001; // Set the port from the environment variable or default to 3001

// Middleware
app.use(express.json());
app.use(cors());
app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  
}));

// Routes
app.get('/', (req, res) => {
    res.send('Hello GDGOC');
});
app.use("/upcomingevent",upcomingeventRouter)
app.use("/team",teamrouter)
// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
