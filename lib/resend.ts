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
  const rows = [
    ["NAME", data.name],
    ["EMAIL", data.email],
    ["PHONE", data.phone || "—"],
    ["PROJECT TYPE", data.projectType],
    ["SUBJECT", data.title],
  ];

  const rowsHtml = rows.map(([label, value], i) => `
    <tr>
      <td bgcolor="#1a1a1a" style="background:#1a1a1a;padding:11px 16px;width:110px;${i > 0 ? "border-top:1px solid #2a2a2a;" : ""}">
        <span style="font-family:Arial,sans-serif;font-size:10px;font-weight:700;color:#888888;letter-spacing:0.08em;text-transform:uppercase;">${label}</span>
      </td>
      <td bgcolor="#1a1a1a" style="background:#1a1a1a;padding:11px 16px;${i > 0 ? "border-top:1px solid #2a2a2a;" : ""}">
        ${label === "EMAIL"
          ? `<a href="mailto:${value}" style="font-family:Arial,sans-serif;font-size:13px;color:#f0a500;text-decoration:none;font-weight:600;">${value}</a>`
          : `<span style="font-family:Arial,sans-serif;font-size:13px;color:#f0f0f0;font-weight:${label === "SUBJECT" ? "700" : "400"};">${value}</span>`
        }
      </td>
    </tr>
  `).join("");

  const photosHtml = data.imageUrls.length > 0 ? `
    <tr>
      <td bgcolor="#111111" style="background:#111111;padding:0 0 4px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td bgcolor="#111111" style="background:#111111;padding:16px 20px 20px;">
              <p style="font-family:Arial,sans-serif;font-size:10px;font-weight:700;color:#888888;letter-spacing:0.08em;text-transform:uppercase;margin:0 0 12px;">ATTACHED PHOTOS (${data.imageUrls.length})</p>
              ${data.imageUrls.map((url, i) =>
                `<a href="${url}" style="display:inline-block;margin:0 8px 8px 0;">
                  <img src="${url}" width="150" height="112" style="border-radius:6px;border:2px solid #2a2a2a;display:block;" alt="Photo ${i + 1}" />
                </a>`
              ).join("")}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  ` : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>New Quote Request</title>
  <style>
    body { margin:0!important; padding:0!important; background:#f4f4f4!important; }
  </style>
</head>
<body bgcolor="#f4f4f4" style="margin:0;padding:0;background:#f4f4f4;">

<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f4f4f4" style="background:#f4f4f4;">
  <tr>
    <td align="center" bgcolor="#f4f4f4" style="background:#f4f4f4;padding:32px 16px;">

      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;">

        <!-- HEADER -->
        <tr>
          <td bgcolor="#0f0f0f" style="background:#0f0f0f;border-radius:12px 12px 0 0;padding:0;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <!-- Red top bar -->
              <tr>
                <td bgcolor="#c0392b" style="background:linear-gradient(90deg,#c0392b,#a93226);height:4px;font-size:0;line-height:0;border-radius:12px 12px 0 0;">&nbsp;</td>
              </tr>
              <tr>
                <td bgcolor="#0f0f0f" style="background:#0f0f0f;padding:24px 28px 22px;">
                  <table cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td bgcolor="#1e1e1e" style="background:#1e1e1e;border:1px solid #c0392b;border-radius:100px;padding:5px 14px;">
                        <span style="font-family:Arial,sans-serif;font-size:10px;font-weight:700;color:#f0a500;letter-spacing:0.1em;text-transform:uppercase;">&#9670; New Quote Request</span>
                      </td>
                    </tr>
                  </table>
                  <div style="height:14px;">&nbsp;</div>
                  <p style="font-family:Arial,sans-serif;font-size:20px;font-weight:900;color:#ffffff;margin:0;line-height:1.2;">Dragon Recreation Services</p>
                  <div style="height:6px;">&nbsp;</div>
                  <p style="font-family:Arial,sans-serif;font-size:13px;color:#888888;margin:0;">A new inquiry has been submitted via your website.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- FIELDS -->
        <tr>
          <td bgcolor="#111111" style="background:#111111;padding:20px 20px 0;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-radius:8px;overflow:hidden;border:1px solid #2a2a2a;">
              ${rowsHtml}
            </table>
          </td>
        </tr>

        <!-- MESSAGE -->
        <tr>
          <td bgcolor="#111111" style="background:#111111;padding:16px 20px 0;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td bgcolor="#1a1a1a" style="background:#1a1a1a;border:1px solid #2a2a2a;border-left:3px solid #c0392b;border-radius:0 8px 8px 0;padding:16px 18px;">
                  <p style="font-family:Arial,sans-serif;font-size:10px;font-weight:700;color:#888888;letter-spacing:0.08em;text-transform:uppercase;margin:0 0 10px;">MESSAGE</p>
                  <p style="font-family:Arial,sans-serif;font-size:13px;color:#cccccc;line-height:1.7;margin:0;white-space:pre-wrap;">${data.message}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr><td bgcolor="#111111" style="background:#111111;height:16px;">&nbsp;</td></tr>

        <!-- PHOTOS -->
        ${photosHtml}

        <!-- FOOTER -->
        <tr>
          <td bgcolor="#0f0f0f" style="background:#0f0f0f;border-radius:0 0 12px 12px;border-top:1px solid #2a2a2a;padding:16px 24px;">
            <p style="font-family:Arial,sans-serif;font-size:11px;font-weight:700;color:#c0392b;margin:0;letter-spacing:0.05em;">DRAGON RECREATION SERVICES</p>
            <p style="font-family:Arial,sans-serif;font-size:11px;color:#444444;margin:4px 0 0;">Inquiry ID: ${data.inquiryId}</p>
          </td>
        </tr>

        <!-- BOTTOM SPACE -->
        <tr><td style="height:24px;">&nbsp;</td></tr>

      </table>
    </td>
  </tr>
</table>

</body>
</html>`;
}
