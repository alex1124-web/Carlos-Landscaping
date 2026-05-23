import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const port = 3000;

async function startServer() {
  const app = express();
  app.use(express.json());

  // Initialize Gemini client on the server lazily/safely
  let ai: GoogleGenAI | null = null;
  function getGeminiClient() {
    if (!ai) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        console.warn("WARNING: GEMINI_API_KEY is not set. Gemini features will be limited.");
      }
      ai = new GoogleGenAI({
        apiKey: apiKey || "MOCK_KEY_FOR_BUILD",
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
    return ai;
  }

  // Lazy SMTP initialization
  let transporter: nodemailer.Transporter | null = null;
  function getTransporter() {
    const host = process.env.SMTP_HOST;
    const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (!host || !user || !pass) {
      return null;
    }

    if (!transporter) {
      transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: {
          user,
          pass,
        },
      });
    }
    return transporter;
  }

  // API Endpoints
  // POST /api/send-quote
  app.post("/api/send-quote", async (req, res) => {
    try {
      const { clientName, clientEmail, clientPhone, style, budget, elements, areaSize, notes, destinationEmail } = req.body;
      const contactEmail = destinationEmail || process.env.CONTACT_RECEIVER_EMAIL || "artthegoat1134@gmail.com";

      const mailBodyHtml = `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e1e1e1; border-radius: 8px; background-color: #fcfdfd;">
          <div style="background-color: #0f2418; padding: 20px; text-align: center; border-radius: 6px 6px 0 0;">
            <h1 style="color: #ffffff; font-size: 24px; margin: 0; font-family: Georgia, serif;">Carlo's Landscapes</h1>
            <p style="color: #a7f3d0; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin: 8px 0 0 0; font-weight: bold;">New Landscape Quote Request</p>
          </div>
          
          <div style="padding: 24px 0;">
            <h2 style="font-size: 18px; color: #0d2114; margin-top: 0; border-bottom: 2px solid #10b981; padding-bottom: 8px;">Inquiry Reference Details</h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr>
                <td style="padding: 10px 0; color: #52525b; width: 35%; font-weight: bold; border-bottom: 1px solid #f4f4f5; font-size: 13px;">Client Name:</td>
                <td style="padding: 10px 0; color: #18181b; font-weight: 500; border-bottom: 1px solid #f4f4f5; font-size: 13px;">${clientName || "Estate Client"}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #52525b; font-weight: bold; border-bottom: 1px solid #f4f4f5; font-size: 13px;">Client Email:</td>
                <td style="padding: 10px 0; color: #10b981; font-weight: bold; border-bottom: 1px solid #f4f4f5; font-size: 13px;">${clientEmail || "Not provided"}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #52525b; font-weight: bold; border-bottom: 1px solid #f4f4f5; font-size: 13px;">Client Phone:</td>
                <td style="padding: 10px 0; color: #18181b; border-bottom: 1px solid #f4f4f5; font-size: 13px;">${clientPhone || "Not provided"}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #52525b; font-weight: bold; border-bottom: 1px solid #f4f4f5; font-size: 13px;">Service Requested:</td>
                <td style="padding: 10px 0; color: #18181b; font-weight: 500; border-bottom: 1px solid #f4f4f5; font-size: 13px;">${style || "Complete Landscape Design"}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #52525b; font-weight: bold; border-bottom: 1px solid #f4f4f5; font-size: 13px;">Landscape Area Size:</td>
                <td style="padding: 10px 0; color: #18181b; border-bottom: 1px solid #f4f4f5; font-size: 13px;">${areaSize || "Medium Garden (200-300 sq ft)"}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #52525b; font-weight: bold; border-bottom: 1px solid #f4f4f5; font-size: 13px;">Estimate Reference:</td>
                <td style="padding: 10px 0; color: #d97706; font-weight: bold; border-bottom: 1px solid #f4f4f5; font-size: 13px;">${budget || "Free On-Site Estimate"}</td>
              </tr>
              ${elements && elements.length ? `
              <tr>
                <td style="padding: 10px 0; color: #52525b; font-weight: bold; border-bottom: 1px solid #f4f4f5; font-size: 13px; vertical-align: top;">Key Scope Items:</td>
                <td style="padding: 10px 0; color: #18181b; border-bottom: 1px solid #f4f4f5; font-size: 13px;">
                  <ul style="margin: 0; padding-left: 20px;">
                    ${elements.map((item: string) => `<li style="margin-bottom: 3px;">${item}</li>`).join("")}
                  </ul>
                </td>
              </tr>
              ` : ""}
            </table>

            <h2 style="font-size: 15px; color: #0d2114; margin-top: 16px;">Additional Client Notes:</h2>
            <div style="background-color: #f4fbf7; border-left: 4px solid #10b981; padding: 12px 16px; font-size: 13px; color: #27272a; line-height: 1.5; font-style: italic;">
              ${notes || "No extra requirements provided."}
            </div>
          </div>
          
          <div style="border-top: 1px solid #e4e4e7; padding-top: 16px; text-align: center; color: #71717a; font-size: 11px;">
            <p style="margin: 0;">This email is auto-delivered via Carlo's Landscapes App Gateway.</p>
            <p style="margin: 4px 0 0 0;">Forwarded to owner mailbox: <strong>${contactEmail}</strong></p>
          </div>
        </div>
      `;

      console.log(`[EMAIL MANAGER] Preparing to send quote to ${contactEmail}`);
      console.log(`[EMAIL CONTENT]\n`, {
        from: `"${clientName || "Estate Client"}" <${clientEmail}>`,
        to: contactEmail,
        subject: `[QUOTE REQUEST] ${style || "Landscape"} - ${clientName || "Estate Client"}`,
        clientEmail,
        clientPhone,
        areaSize,
        budget,
        notes
      });

      const mailer = getTransporter();
      if (mailer) {
        await mailer.sendMail({
          from: `"${clientName || "Estate Client"}" <no-reply@carloslandscapes.com>`,
          to: contactEmail,
          replyTo: clientEmail,
          subject: `[QUOTE REQUEST] ${style || "Landscape"} - ${clientName || "Estate Client"}`,
          html: mailBodyHtml
        });
        console.log(`[EMAIL MANAGER] Mail sent successfully to ${contactEmail}`);
        res.status(200).json({ status: "success", method: "smtp", message: `Quote sent successfully to ${contactEmail}` });
      } else {
        console.warn(`[EMAIL MANAGER] SMTP is not configured. Safe-logged message to server console!`);
        res.status(200).json({ 
          status: "success", 
          method: "console", 
          message: `Quote registered! In production, email will be sent to ${contactEmail}. It has been logged to the dev console in this sandbox environment.`
        });
      }
    } catch (error: any) {
      console.error("Email API Handler Error:", error);
      res.status(500).json({ status: "error", error: error.message || "Failed to process quote request email dispatch" });
    }
  });

  // POST /api/design-consult
  app.post("/api/design-consult", async (req, res) => {
    try {
      const { gardenStyle, region, soilType, elements, dimensions, additionalNotes } = req.body;
      
      const client = getGeminiClient();
      const prompt = `You are an elite architectural landscape architect at "Carlos Landscaping". 
Provide a bespoke luxury landscape design plan for a client with the following details:
- Garden Aesthetic: ${gardenStyle}
- Climate Region/Zip: ${region}
- Soil Condition/Type: ${soilType || "Not specified"}
- Selected Living or Architectural Features: ${elements ? elements.join(", ") : "Not specified"}
- Dimensions/Area: ${dimensions || "Not specified"}
- Special requests: ${additionalNotes || "None"}

Please design an exquisite layout and species plan. Break your answer logically into the following sections using clear headings (you can use markdown style but format it cleanly):
1. **Design Concept & Spatial Vision**: A detailed aesthetic concept and overall theme (describing sightlines, materials, mood, and how natural light interact).
2. **Architectural Hardscape & Materials Selection**: Select stone paving, wall accents, retaining features, or wood grades (e.g. basalt, silver limestone, teak, architectural concrete) matching the style.
3. **Curated Flora & Seasonality**: Specific plant list that thrives in ${region} with ${soilType} conditions, including common & botanical names, arrangement strategy, and visual interest across all four seasons.
4. **Water and Light Plan**: Designing the mood of the garden during twilight and dusk with specific fixtures, reflecting pools, fountains, or ground wash lights.
5. **Growth Progress & Maintenance Plan**: Key care instructions to let this biomorphic living structure blend perfectly into the ecosystem.

Be highly detailed, luxury-focused, professional, and inspire the client with evocative, tactile language. Keep formatting incredibly polished.`;

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          temperature: 0.7,
        },
      });

      res.status(200).json({ text: response.text });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: error.message || "Failed to generate design plan" });
    }
  });

  // Handle Vite middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(port, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${port}`);
  });
}

startServer().catch((err) => {
  console.error("Error starting server:", err);
});
