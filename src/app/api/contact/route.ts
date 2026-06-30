import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { checkRateLimit } from "@/lib/rate-limiter";
import { sanitize } from "@/lib/sanitize";

type ContactPayload = {
  nombre: string;
  vehiculo: string;
  anio?: string;
  descripcion: string;
  timestamp: string;
};

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    const rate = checkRateLimit(ip);
    if (!rate.allowed) {
      return NextResponse.json(
        {
          ok: false,
          error: "Demasiadas solicitudes. Intenta de nuevo más tarde.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(Math.ceil((rate.resetAt - Date.now()) / 1000)),
            "X-RateLimit-Remaining": "0",
          },
        }
      );
    }

    const body = await req.json();
    const rawNombre = typeof body.nombre === "string" ? body.nombre : "";
    const rawVehiculo = typeof body.vehiculo === "string" ? body.vehiculo : "";
    const rawAnio = typeof body.anio === "string" ? body.anio : "";
    const rawDescripcion = typeof body.descripcion === "string" ? body.descripcion : "";

    const nombre = sanitize(rawNombre).slice(0, 120);
    const vehiculo = sanitize(rawVehiculo).slice(0, 80);
    const anio = sanitize(rawAnio).slice(0, 10);
    const descripcion = sanitize(rawDescripcion).slice(0, 2000);

    if (!nombre || !vehiculo || !descripcion) {
      return NextResponse.json(
        { ok: false, error: "Faltan campos requeridos." },
        { status: 400, headers: { "X-RateLimit-Remaining": String(rate.remaining) } }
      );
    }

    const payload: ContactPayload = {
      nombre,
      vehiculo,
      anio,
      descripcion,
      timestamp: new Date().toISOString(),
    };

    const id = `BG-${Date.now().toString(36).toUpperCase()}`;

    const escHtml = (s: string) =>
      s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");

    const html = `
      <div style="font-family:monospace;background:#0a0a0a;color:#f5f3ef;padding:32px;border:1px solid #e8302a;">
        <h2 style="color:#e8302a;margin:0 0 8px;">NUEVA SOLICITUD DE SERVICIO</h2>
        <p style="color:#666;margin:0 0 24px;">ID: ${escHtml(id)} | ${escHtml(payload.timestamp)}</p>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;color:#666;">NOMBRE</td><td style="padding:8px 0;color:#f5f3ef;">${escHtml(nombre)}</td></tr>
          <tr><td style="padding:8px 0;color:#666;">VEHÍCULO</td><td style="padding:8px 0;color:#f5f3ef;">${escHtml(vehiculo)}${anio ? ` (${escHtml(anio)})` : ""}</td></tr>
          <tr><td style="padding:8px 0;color:#666;vertical-align:top;">DESCRIPCIÓN</td><td style="padding:8px 0;color:#f5f3ef;">${escHtml(descripcion)}</td></tr>
        </table>
        <hr style="border:none;border-top:1px solid #333;margin:24px 0 16px;" />
        <p style="color:#666;font-size:12px;margin:0;">Black Ghost's Garage — Panel de notificaciones</p>
      </div>
    `;

    await transporter.sendMail({
      from: `"Black Ghost's Garage" <${process.env.SMTP_FROM}>`,
      to: process.env.CONTACT_EMAIL,
      replyTo: payload.nombre,
      subject: `[${id}] Nueva solicitud — ${vehiculo}`,
      html,
    });

    console.log(`[CONTACT] Email enviado: ${id} — ${nombre} — ${vehiculo}`);

    return NextResponse.json({
      ok: true,
      message: "Transmisión enviada correctamente.",
      id,
    });
  } catch (error) {
    console.error("[CONTACT] Error:", error);
    return NextResponse.json(
      { ok: false, error: "Error al enviar el email." },
      { status: 500 }
    );
  }
}
