import { Resend } from "resend";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const field = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  // Honeypot filled in: pretend success so bots move on.
  if (field(body.company, 100)) return Response.json({ ok: true });

  const name = field(body.name, 100);
  const email = field(body.email, 150);
  const phone = field(body.phone, 20);
  const message = field(body.message, 2000);

  if (!name || !phone || !message || !EMAIL_RE.test(email)) {
    return Response.json({ error: "Please fill all required fields with valid details." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.error("Contact form: RESEND_API_KEY or CONTACT_TO_EMAIL is not set");
    return Response.json({ error: "Email service is not configured yet. Please call us instead." }, { status: 500 });
  }

  const rows = [
    ["Name", name],
    ["Email", email],
    ["Phone", phone],
  ]
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 12px;color:#475569;font-weight:600">${k}</td><td style="padding:8px 12px;color:#0b1e33">${escape(v)}</td></tr>`,
    )
    .join("");

  const html = `
  <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;border:1px solid #e0f2fe;border-radius:16px;overflow:hidden">
    <div style="background:linear-gradient(135deg,#0ea5e9,#22d3ee);padding:20px 24px;color:#fff">
      <h2 style="margin:0;font-size:20px">⚡ New enquiry: Suneeta E Mobility</h2>
    </div>
    <table style="width:100%;border-collapse:collapse;margin:12px 0">${rows}</table>
    <div style="padding:0 24px 24px">
      <p style="color:#475569;font-weight:600;margin:0 0 6px">Message</p>
      <p style="color:#0b1e33;white-space:pre-wrap;background:#f0f9ff;padding:14px;border-radius:10px;margin:0">${escape(message)}</p>
    </div>
  </div>`;

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL || "Suneeta E Mobility <onboarding@resend.dev>",
    to: to.split(",").map((e) => e.trim()),
    replyTo: email,
    subject: `New enquiry from ${name}`,
    html,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n${message}`,
  });

  if (error) {
    console.error("Resend error:", error);
    return Response.json({ error: "Could not send your message. Please try again." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
