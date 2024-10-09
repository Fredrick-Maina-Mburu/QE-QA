import { Request, Response, NextFunction } from "express";
import { XataClient } from "../xata"; 
import dotenv from "dotenv";

dotenv.config()

const xata = new XataClient({ apiKey: process.env.XATA_API_KEY, branch: process.env.XATA_BRANCH });

// Middleware to fetch an event by ID

async function fetchEventById(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { id } = req.params;
  try {
    const event = await xata.db.events.read(id);
    if (!event) {
      res.status(404).json({ message: 'Event not found' });
    }

    req.body.event = event;
    next();
  } catch (err) {
    next(err);
  }
}

export { fetchEventById }