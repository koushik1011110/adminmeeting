import { bookings, type Booking } from "@shared/schema";
import { createClient } from "@supabase/supabase-js";

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  throw new Error("Missing Supabase credentials");
}

// Store the credentials in constants after the null check
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

export interface IStorage {
  getBookings(): Promise<Booking[]>;
  completeBooking(id: string): Promise<void>;
  rejectBooking(id: string): Promise<void>;
}

export class SupabaseStorage implements IStorage {
  private supabase;

  constructor() {
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  async getBookings(): Promise<Booking[]> {
    const { data, error } = await this.supabase
      .from("bookings")
      .select("*")
      .order("date", { ascending: true });

    if (error) {
      throw new Error(`Failed to fetch bookings: ${error.message}`);
    }

    return data as Booking[];
  }

  async completeBooking(id: string): Promise<void> {
    const { error } = await this.supabase
      .from("bookings")
      .update({ status: 'completed' })
      .eq('id', id);

    if (error) {
      throw new Error(`Failed to complete booking: ${error.message}`);
    }
  }

  async rejectBooking(id: string): Promise<void> {
    const { error } = await this.supabase
      .from("bookings")
      .update({ status: 'rejected' })
      .eq('id', id);

    if (error) {
      throw new Error(`Failed to reject booking: ${error.message}`);
    }
  }
}

export const storage = new SupabaseStorage();