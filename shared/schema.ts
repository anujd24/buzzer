import { pgTable, text, varchar, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const complaints = pgTable("complaints", {
  id: varchar("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  complaint: text("complaint").notNull(),
});

export const insertComplaintSchema = createInsertSchema(complaints).omit({
  id: true,
}).extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  complaint: z.string().min(10, "Complaint must be at least 10 characters"),
});

export type InsertComplaint = z.infer<typeof insertComplaintSchema>;
export type Complaint = typeof complaints.$inferSelect;

export const orders = pgTable("orders", {
  id: varchar("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  quantity: integer("quantity").notNull(),
});

export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
}).extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
});

export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;

export const users = pgTable("users", {
  id: varchar("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
