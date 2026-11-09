import { z } from "zod";
import { contactSchema } from "@/lib/contact";

// shortcut: no rate limiting — add one (e.g. Vercel Firewall or Upstash) if spam gets through the honeypot.
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "Invalid input", fields: z.flattenError(parsed.error).fieldErrors },
      { status: 400 },
    );
  }

  const { website, ...data } = parsed.data;
  // Honeypot filled: report success so bots don't learn to adapt, but send nothing.
  if (website) return Response.json({ ok: true });

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    console.error("Contact form: set RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL");
    return Response.json({ error: "Email is not configured" }, { status: 500 });
  }

  // Plain-text body only, so user input is never interpreted as HTML.
  const text = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Company: ${data.company || "—"}`,
    `Service: ${data.service || "—"}`,
    "",
    data.message,
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to,
      reply_to: data.email,
      subject: `New enquiry from ${data.name}`,
      text,
    }),
  });

  if (!res.ok) {
    console.error("Contact form: Resend error", res.status, await res.text());
    return Response.json({ error: "Could not send message" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
