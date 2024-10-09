import express, { Express, Request, Response, NextFunction } from "express";
import { XataClient } from "./xata";
import dotenv from "dotenv";
import { fetchEventById } from "./middleware/fetchEventById";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

// initialize
const app: Express = express();
const port = process.env.PORT || 3001;
const xata = new XataClient({ apiKey: process.env.XATA_API_KEY, branch: process.env.XATA_BRANCH });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// GET all products
app.get("/api/products", async (req: Request, res: Response) => {
  try {
    const records = await xata.db.events
      .select(["xata_id", "company", "date", "imageUrl", "location", "price", "title"])
      .getAll();
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// POST create a new product
app.post("/api/products", async (req: Request, res: Response) => {
  const { company, date, imageUrl, location, price, title } = req.body;
  try {
    const newEvent = await xata.db.events.create({
      company,
      date,
      imageUrl,
      location,
      price,
      title,
    });
    res.status(201).json({ message: "Event added successfully", newEvent });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// PUT update a product
app.put("/api/products/:id", fetchEventById, async (req: Request, res: Response) => {
  const { company, date, imageUrl, location, price, title } = req.body;
  try {
    const updatedEvent = await xata.db.events.update(req.params.id, {
      company,
      date,
      imageUrl,
      location,
      price,
      title,
    });
    res.status(200).json({ message: "Event updated successfully", updatedEvent });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// GET a product by ID
app.get("/api/products/:id", fetchEventById, (req: Request, res: Response) => {
  res.status(200).json({ message: "Event found", event: req.body.event });
});

// DELETE a product
app.delete("/api/products/:id", fetchEventById, async (req: Request, res: Response) => {
  try {
    await xata.db.events.delete(req.params.id);
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// Error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
