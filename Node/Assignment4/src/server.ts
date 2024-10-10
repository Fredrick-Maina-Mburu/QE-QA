import express, { Express, Request, Response, NextFunction } from "express";
import { XataClient } from "./xata";
import dotenv from "dotenv";
import { fetchEventById } from "./middleware/fetchEventById";
import { errorHandler } from "./middleware/errorHandler";
import { body, param, validationResult } from "express-validator";

dotenv.config();

// initialize
const app: Express = express();
const port = process.env.PORT || 3001;
const xata = new XataClient({ apiKey: process.env.XATA_API_KEY, branch: process.env.XATA_BRANCH });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Validation middleware
const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
     res.status(400).json({ errors: errors.array() });
  }
  next();
};

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
app.post("/api/products", [
  body("company").notEmpty().withMessage("Company is required").escape(),
  body("date").isISO8601().toDate().withMessage("Invalid date format"),
  body("imageUrl").isURL().withMessage("Invalid image URL").escape(),
  body("location").notEmpty().withMessage("Location is required").escape(),
  body("price").isFloat({ min: 0 }).withMessage("Price must be a positive number"),
  body("title").notEmpty().withMessage("Title is required").escape(),
  validateRequest
], async (req: Request, res: Response) => {
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
app.put("/api/products/:id", [
  param("id").isString().notEmpty().withMessage("Invalid ID"),
  body("company").optional().isString().withMessage("Company must be a string").escape(),
  body("date").optional().isISO8601().toDate().withMessage("Invalid date format"),
  body("imageUrl").optional().isURL().withMessage("Invalid image URL").escape(),
  body("location").optional().isString().withMessage("Location must be a string").escape(),
  body("price").optional().isFloat({ min: 0 }).withMessage("Price must be a positive number"),
  body("title").optional().isString().withMessage("Title must be a string").escape(),
  validateRequest,
  fetchEventById
], async (req: Request, res: Response) => {
  const { company, date, imageUrl, location, price, title } = req.body;
  const existingEvent = req.body.event;
  try {
    const updatedEvent = await xata.db.events.update(existingEvent.id, {
      company: company !== undefined ? company : existingEvent.company,
      date: date !== undefined ? date : existingEvent.date,
      imageUrl: imageUrl !== undefined ? imageUrl : existingEvent.imageUrl,
      location: location !== undefined ? location : existingEvent.location,
      price: price !== undefined ? price : existingEvent.price,
      title: title !== undefined ? title : existingEvent.title,
    });
    res.status(200).json({ message: "Event updated successfully", updatedEvent });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// GET a product by ID
app.get("/api/products/:id", [
  param("id").isString().notEmpty().withMessage("Invalid ID"),
  validateRequest,
  fetchEventById
], (req: Request, res: Response) => {
  res.status(200).json({ message: "Event found", event: req.body.event });
});

// DELETE a product
app.delete("/api/products/:id", [
  param("id").isString().notEmpty().withMessage("Invalid ID"),
  validateRequest,
  fetchEventById
], async (req: Request, res: Response) => {
  const existingEvent = req.body.event;
  try {
    await xata.db.events.delete(existingEvent.id);
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