import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  date: timestamp("date").notNull(),
  time: text("time").notNull(),
  mobile_phone: text("mobile_phone").notNull(),
});

export const insertBookingSchema = createInsertSchema(bookings).pick({
  date: true,
  time: true,
  mobile_phone: true,
});

export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookings.$inferSelect;
