import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express) {
  app.get("/api/bookings", async (_req, res) => {
    try {
      const bookings = await storage.getBookings();
      res.json(bookings);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/bookings/:id/complete", async (req, res) => {
    try {
      const id = req.params.id;
      await storage.completeBooking(id);
      res.json({ message: "Booking completed successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/bookings/:id/reject", async (req, res) => {
    try {
      const id = req.params.id;
      await storage.rejectBooking(id);
      res.json({ message: "Booking rejected successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  return createServer(app);
}