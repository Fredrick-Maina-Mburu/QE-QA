
import express, { Express, Request, Response, NextFunction } from "express";
import { Router } from "express";
import { XataClient } from "../xata";
import { validateRequest } from "../middleware/validateRequest";
import { body, param } from "express-validator";
import { fetchEventById } from "../middleware/fetchEventById";


// GET all products

const productRouter = Router()

const xata = new XataClient({ apiKey: process.env.XATA_API_KEY, branch: process.env.XATA_BRANCH });

productRouter.get("/products", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const records = await xata.db.events
      .select(["xata_id", "company", "date", "imageUrl", "location", "price", "title"])
      .getAll();
    res.json(records);
  } catch (error) {
    next(error);
  }
});

// POST create a new product
productRouter.post("/products", [
  body("company").notEmpty().withMessage("Company is required").escape(),
  body("date").notEmpty().withMessage("Date is required"),
  body("imageUrl").isURL().withMessage("Invalid image URL").escape(),
  body("location").notEmpty().withMessage("Location is required").escape(),
  body("price").isFloat({ min: 0 }).withMessage("Price must be a positive number"),
  body("title").notEmpty().withMessage("Title is required").escape(),
  validateRequest
], async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { company, date, imageUrl, location, price, title } = req.body;
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
    next(error);
  }
});

// PUT update a product
productRouter.put("/products/:id", [
  param("id").isString().notEmpty().withMessage("Invalid ID"),
  body("company").optional().isString().withMessage("Company must be a string").escape(),
  body("date").optional(),
  body("imageUrl").optional().isURL().withMessage("Invalid image URL"),
  body("location").optional().isString().withMessage("Location must be a string").escape(),
  body("price").optional().isFloat({ min: 0 }).withMessage("Price must be a positive number"),
  body("title").optional().isString().withMessage("Title must be a string").escape(),
  validateRequest,
  fetchEventById
], async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { company, date, imageUrl, location, price, title } = req.body;
    const existingEvent = req.body.event;
    console.log(existingEvent)
    const updatedEvent = await xata.db.events.update(existingEvent.xata_id, {
      company: company || existingEvent.company,
      date: date || existingEvent.date,
      imageUrl: imageUrl || existingEvent.imageUrl,
      location: location || existingEvent.location,
      price: price || existingEvent.price,
      title: title || existingEvent.title
    });
    res.status(200).json({ message: "Event updated successfully", updatedEvent });
  } catch (error) {
    next(error);
  }
});

// GET a product by ID
productRouter.get("/products/:id", [
  param("id").isString().notEmpty().withMessage("Invalid ID"),
  validateRequest,
  fetchEventById
], (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({ message: "Event found", event: req.body.event });
  } catch (error) {
    next(error);
  }
});

// DELETE a product
productRouter.delete("/products/:id", [
  param("id").isString().notEmpty().withMessage("Invalid ID"),
  validateRequest,
  fetchEventById
], async (req: Request, res: Response, next: NextFunction) => {
  try {
    const existingEvent = req.body.event;
    await xata.db.events.delete(existingEvent.xata_id);
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    next(error);
  }
});

export { productRouter}