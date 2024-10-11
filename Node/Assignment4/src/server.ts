import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorHandler";
import { productRouter } from "./routes/productsRoutes";


dotenv.config();

// initialize
const app: Express = express();
const port = process.env.PORT || 3001;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', productRouter)

// Error handler middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});