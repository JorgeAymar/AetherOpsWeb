import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import nodemailer from "nodemailer";

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

function createMailer() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: parseInt(SMTP_PORT || "587", 10),
    secure: SMTP_PORT === "465",
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

const mailer = createMailer();

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function sendDemoNotification(data: z.infer<typeof demoRequestSchema>) {
  const to = process.env.NOTIFICATION_EMAIL || process.env.SMTP_USER;
  if (!mailer || !to) {
    console.log(`[demo-request] SMTP not configured — request from ${data.companyName} not emailed`);
    return;
  }

  const dateStr = data.date ? new Date(data.date).toLocaleDateString("en-US", { dateStyle: "long" }) : "Not specified";

  // All user-supplied values are HTML-escaped before going into the email body
  const d = {
    fullName: escapeHtml(data.fullName),
    companyName: escapeHtml(data.companyName),
    email: escapeHtml(data.email),
    emailHref: encodeURIComponent(data.email),
    phone: escapeHtml(data.phone),
    fleetSize: escapeHtml(data.fleetSize),
    challenge: escapeHtml(data.challenge),
    date: escapeHtml(dateStr),
    comments: data.comments ? escapeHtml(data.comments) : "",
  };

  await mailer.sendMail({
    from: `"AetherOps" <${process.env.SMTP_USER}>`,
    to,
    replyTo: data.email,
    subject: `New Demo Request — ${data.companyName}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#f9fafb;padding:24px;border-radius:8px">
        <h2 style="color:#111;margin-bottom:4px">New Demo Request</h2>
        <p style="color:#6b7280;margin-top:0">Submitted at ${new Date().toLocaleString("en-US")}</p>
        <table style="width:100%;border-collapse:collapse;margin-top:16px">
          <tr><td style="padding:8px 0;color:#6b7280;width:140px">Name</td><td style="padding:8px 0;font-weight:600">${d.fullName}</td></tr>
          <tr style="background:#fff"><td style="padding:8px;color:#6b7280">Company</td><td style="padding:8px;font-weight:600">${d.companyName}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280">Email</td><td style="padding:8px 0"><a href="mailto:${d.emailHref}">${d.email}</a></td></tr>
          <tr style="background:#fff"><td style="padding:8px;color:#6b7280">Phone</td><td style="padding:8px">${d.phone}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280">Fleet Size</td><td style="padding:8px 0">${d.fleetSize} instances</td></tr>
          <tr style="background:#fff"><td style="padding:8px;color:#6b7280">Challenge</td><td style="padding:8px">${d.challenge}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280">Preferred Date</td><td style="padding:8px 0">${d.date}</td></tr>
          ${d.comments ? `<tr style="background:#fff"><td style="padding:8px;color:#6b7280">Comments</td><td style="padding:8px">${d.comments}</td></tr>` : ""}
        </table>
        <div style="margin-top:24px;padding:12px 16px;background:#111;border-radius:6px;text-align:center">
          <a href="mailto:${d.emailHref}" style="color:#fff;text-decoration:none;font-weight:600">Reply to ${d.fullName}</a>
        </div>
      </div>
    `,
  });

  console.log(`[demo-request] Email sent to ${to} for ${data.companyName}`);
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/demo-request", async (req: Request, res: Response) => {
    const result = demoRequestSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid request data", errors: z.flattenError(result.error) });
    }

    try {
      await sendDemoNotification(result.data);
    } catch (err) {
      console.error("[demo-request] Failed to send email:", err);
    }

    return res.status(201).json({ message: "Demo request received. Our team will contact you shortly." });
  });

  // 404 for any undefined /api route — prevents SPA fallback from masking missing endpoints
  // Express 4 + path-to-regexp 0.1.x: plain "*" wildcard, not the Express 5 "*splat" syntax
  app.all("/api/*", (_req: Request, res: Response) => {
    res.status(404).json({ message: "Not found" });
  });

  return httpServer;
}
