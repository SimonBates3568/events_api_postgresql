import { Router } from "express";
import getEvents from "../services/events/getEvents.js";
import createEvent from "../services/events/createEvent.js";
import getEventById from "../services/events/getEventById.js";
import deleteEventById from "../services/events/deleteEventById.js";
import updateEventById from "../services/events/updateEventById.js";
import auth from "../middleware/auth.js";

const router = Router();
// GET all events with optional query parameters for title and location
router.get("/", async (req, res, next) => {
  try {
    const { title, location } = req.query;
    const events = await getEvents(title, location);
    res.json(events);
  } catch (error) {
    next(error);
  }
});
// Create a new event
router.post("/", async (req, res, next) => {
  try {
    console.log("Login body:", req.body);
    const {
      title,
      description,
      location,
      image,
      startTime,
      endTime,
      createdBy,
      categoryIds,
    } = req.body;
    const newEvent = await createEvent(
      title,
      description,
      location,
      image,
      startTime,
      endTime,
      createdBy,
      categoryIds
    );
    res.status(201).json(newEvent);
  } catch (error) {
    next(error);
  }
});
// Get event by ID
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await getEventById(Number(id)); // Convert id to number

    if (!event) {
      res.status(404).json({ message: `Event with id ${id} not found` });
    } else {
      res.status(200).json(event);
    }
  } catch (error) {
    next(error);
  }
});
// Delete event by ID
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await deleteEventById(id);

    if (event) {
      res.status(200).send({
        message: `Event with id ${id} successfully deleted`,
        event,
      });
    } else {
      res.status(404).json({
        message: `Event with id ${id} not found`,
      });
    }
  } catch (error) {
    next(error);
  }
});
// Update event by ID
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      location,
      image,
      startTime,
      endTime,
      createdBy,
      categoryIds,
    } = req.body;
    try {
      const event = await updateEventById(Number(id), {
        title,
        description,
        location,
        image,
        startTime,
        endTime,
        createdBy,
        categoryIds,
      });

      if (event) {
        res.status(200).send({
          message: `Event with id ${id} successfully updated`,
          event, 
        });
      } else {
        res.status(404).json({
          message: `Event with id ${id} not found`,
        });
      }
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
});

export default router;
