import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";

const demoRequestSchema = z.object({
  fullName: z.string().min(2).max(100),
  companyName: z.string().min(2).max(100),
  fleetSize: z.enum(["1-10", "11-50", "50-200", "200+"]),
  challenge: z.enum(["High MTTR", "Security Incidents", "Scaling Issues", "Cost Optimization"]),
  email: z.string().email().max(254),
  phone: z.string().min(10).max(20),
  date: z.string().optional(),
  comments: z.string().max(1000).optional(),
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/demo-request", async (req: Request, res: Response) => {
    const result = demoRequestSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid request data", errors: result.error.flatten() });
    }

    const { fullName, companyName, email, fleetSize, challenge, phone, date, comments } = result.data;

    // Log to server (not browser console) — replace with email/CRM integration as needed
    console.log("[demo-request]", { fullName, companyName, email, fleetSize, challenge, phone, date, comments: comments?.slice(0, 200) });

    return res.status(201).json({ message: "Demo request received. Our team will contact you shortly." });
  });

  // 404 for any undefined /api route — prevents SPA fallback from masking missing endpoints
  app.all("/api/*", (_req: Request, res: Response) => {
    res.status(404).json({ message: "Not found" });
  });

  return httpServer;
}
