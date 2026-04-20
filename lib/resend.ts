import { Resend } from "resend";

export function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("Missing RESEND_API_KEY environment variable");
  return new Resend(key);
}

interface InquiryEmailData {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  title: string;
  message: string;
  imageUrls: string[];
  inquiryId: string;
}

export function buildInquiryEmailHtml(data: InquiryEmailData): string {
  const imageLinks = data.imageUrls
    .map(
      (url, i) =>
        `<a href="${url}" style="display:inline-block;margin:4px;">
          <img src="${url}" width="160" height="120" style="object-fit:cover;border-radius:6px;border:1px solid #3a1a1a;" alt="Photo ${i + 1}" />
        </a>`
    )
    .join("");

  return `
<!DOCTYPE html>
<html lang="en" style="background:#0a0505 !important;">
<head>
  <meta charset="utf-8" />
  <meta name="color-scheme" content="dark" />
  <meta name="supported-color-schemes" content="dark" />
  <style>
    :root { color-scheme: dark; }
    body { background:#0a0505 !important; margin:0 !important; padding:0 !important; }
    * { -webkit-text-size-adjust:none; }
    .field-label { color:#888888 !important; }
    .field-value { color:#f0f0f0 !important; }
    .card { background:#111111 !important; }
    .wrapper { background:#0a0505 !important; }
    a { color:#f0a500 !important; }
    p, td, li, span { color:#f0f0f0 !important; }
  </style>
</head>
<body style="font-family:Arial,sans-serif;background:#0a0505 !important;color:#f0f0f0;margin:0;padding:0;" bgcolor="#0a0505">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#0a0505" style="background:#0a0505 !important;">
    <tr>
      <td align="center" style="padding:32px 16px;background:#0a0505 !important;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:580px;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#8b1a0e,#c0392b);border-radius:12px 12px 0 0;padding:28px 28px 24px;">
              <div style="display:inline-block;background:rgba(0,0,0,0.25);border:1px solid rgba(255,255,255,0.15);border-radius:100px;padding:4px 14px;margin-bottom:12px;">
                <span style="color:#f0a500 !important;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;">New Quote Request</span>
              </div>
              <h1 style="margin:0;color:#ffffff !important;font-size:24px;font-weight:900;line-height:1.2;">Dragon Recreation Services</h1>
              <p style="margin:6px 0 0;color:rgba(255,255,255,0.7) !important;font-size:14px;">A new inquiry has been submitted via your website.</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#111111 !important;border:1px solid #2a1a1a;border-top:none;border-radius:0 0 12px 12px;padding:28px;">

              <!-- Fields -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                ${[
                  ["Name", data.name],
                  ["Email", `<a href="mailto:${data.email}" style="color:#f0a500 !important;text-decoration:none;">${data.email}</a>`],
                  ["Phone", data.phone || "—"],
                  ["Project Type", data.projectType],
                  ["Subject", `<strong style="color:#f0f0f0 !important;">${data.title}</strong>`],
                ].map(([label, value]) => `
                <tr>
                  <td style="padding:10px 0;color:#888888 !important;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;width:120px;vertical-align:top;border-bottom:1px solid #1e1e1e;">${label}</td>
                  <td style="padding:10px 0;color:#f0f0f0 !important;font-size:14px;vertical-align:top;border-bottom:1px solid #1e1e1e;">${value}</td>
                </tr>`).join("")}
              </table>

              <!-- Message -->
              <div style="margin-top:24px;background:#1a0e0e !important;border:1px solid #2a1a1a;border-left:3px solid #c0392b;border-radius:0 8px 8px 0;padding:16px 18px;">
                <p style="margin:0 0 8px;color:#888888 !important;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;">Message</p>
                <p style="margin:0;color:#e0e0e0 !important;font-size:14px;line-height:1.7;white-space:pre-wrap;">${data.message}</p>
              </div>

              <!-- Photos -->
              ${data.imageUrls.length > 0 ? `
              <div style="margin-top:24px;">
                <p style="margin:0 0 12px;color:#888888 !important;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;">Attached Photos (${data.imageUrls.length})</p>
                <div>${imageLinks}</div>
              </div>` : ""}

              <!-- Footer -->
              <div style="margin-top:28px;padding-top:20px;border-top:1px solid #1e1e1e;">
                <p style="margin:0;color:#444444 !important;font-size:11px;">Inquiry ID: ${data.inquiryId}</p>
                <p style="margin:4px 0 0;color:#444444 !important;font-size:11px;">Sent from dragonrecreation.net contact form</p>
              </div>

            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
