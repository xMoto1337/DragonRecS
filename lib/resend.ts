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

  const rowsHtml = rows.map(([label, value]) => `
    <tr>
      <td bgcolor="#0f0808" style="background:#0f0808;padding:10px 16px;border-bottom:1px solid #1e1212;">
        <span style="font-family:Arial,sans-serif;font-size:10px;font-weight:700;color:#666666;letter-spacing:0.08em;text-transform:uppercase;">${label}</span>
      </td>
      <td bgcolor="#0f0808" style="background:#0f0808;padding:10px 16px;border-bottom:1px solid #1e1212;">
        ${label === "EMAIL"
          ? `<a href="mailto:${value}" style="font-family:Arial,sans-serif;font-size:13px;color:#f0a500;text-decoration:none;">${value}</a>`
          : `<span style="font-family:Arial,sans-serif;font-size:13px;color:#e0e0e0;">${value}</span>`
        }
      </td>
    </tr>
  `).join("");

  const photosHtml = data.imageUrls.length > 0 ? `
    <tr>
      <td bgcolor="#080505" style="background:#080505;padding:0 24px 24px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td bgcolor="#1a0a0a" style="background:#1a0a0a;border-radius:8px;padding:16px;border:1px solid #2a1212;">
              <p style="font-family:Arial,sans-serif;font-size:10px;font-weight:700;color:#666666;letter-spacing:0.08em;text-transform:uppercase;margin:0 0 12px;">ATTACHED PHOTOS (${data.imageUrls.length})</p>
              ${data.imageUrls.map((url, i) =>
                `<a href="${url}" style="display:inline-block;margin:0 6px 6px 0;">
                  <img src="${url}" width="140" height="105" style="border-radius:6px;border:1px solid #3a1a1a;display:block;" alt="Photo ${i + 1}" />
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
  <meta name="color-scheme" content="dark only" />
  <meta name="supported-color-schemes" content="dark only" />
  <title>New Quote Request</title>
  <style>
    :root { color-scheme: dark only; }
    body { margin:0!important; padding:0!important; background:#080505!important; }
    table { border-collapse:collapse; }
    u + .body .gmail-fix { display:block!important; }
    /* Force dark on ALL clients */
    [data-ogsc] body { background:#080505!important; }
    [data-ogsc] .card { background:#0f0808!important; }
    @media (prefers-color-scheme: dark) {
      body { background:#080505!important; }
    }
  </style>
</head>
<body class="body" bgcolor="#080505" style="margin:0;padding:0;background:#080505;">

<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#080505" style="background:#080505;">
  <tr>
    <td align="center" bgcolor="#080505" style="background:#080505;padding:32px 16px;">

      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;">

        <!-- TOP ACCENT LINE -->
        <tr>
          <td bgcolor="#c0392b" style="background:linear-gradient(90deg,#c0392b,#f0a500);height:3px;font-size:0;line-height:0;border-radius:4px 4px 0 0;">&nbsp;</td>
        </tr>

        <!-- HEADER -->
        <tr>
          <td bgcolor="#130606" style="background:#130606;padding:28px 28px 24px;border-left:1px solid #2a1212;border-right:1px solid #2a1212;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td>
                  <table cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td bgcolor="#1e0a0a" style="background:#1e0a0a;border:1px solid #c0392b44;border-radius:100px;padding:4px 14px;">
                        <span style="font-family:Arial,sans-serif;font-size:10px;font-weight:700;color:#f0a500;letter-spacing:0.1em;text-transform:uppercase;">&#9670; New Quote Request</span>
                      </td>
                    </tr>
                  </table>
                  <div style="height:14px;">&nbsp;</div>
                  <p style="font-family:Arial,sans-serif;font-size:22px;font-weight:900;color:#f0f0f0;margin:0;line-height:1.2;">Dragon Recreation<br/>Services</p>
                  <div style="height:8px;">&nbsp;</div>
                  <p style="font-family:Arial,sans-serif;font-size:13px;color:#888888;margin:0;">A new quote request has been submitted via your website.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- DIVIDER -->
        <tr>
          <td bgcolor="#080505" style="background:#080505;height:2px;border-left:1px solid #2a1212;border-right:1px solid #2a1212;font-size:0;">&nbsp;</td>
        </tr>

        <!-- FIELDS TABLE -->
        <tr>
          <td bgcolor="#080505" style="background:#080505;padding:0 24px;border-left:1px solid #2a1212;border-right:1px solid #2a1212;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-radius:8px;overflow:hidden;border:1px solid #2a1212;">
              ${rowsHtml}
            </table>
          </td>
        </tr>

        <!-- MESSAGE -->
        <tr>
          <td bgcolor="#080505" style="background:#080505;padding:20px 24px 0;border-left:1px solid #2a1212;border-right:1px solid #2a1212;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td bgcolor="#1a0a0a" style="background:#1a0a0a;border:1px solid #2a1212;border-left:3px solid #c0392b;border-radius:0 8px 8px 0;padding:16px 18px;">
                  <p style="font-family:Arial,sans-serif;font-size:10px;font-weight:700;color:#666666;letter-spacing:0.08em;text-transform:uppercase;margin:0 0 10px;">MESSAGE</p>
                  <p style="font-family:Arial,sans-serif;font-size:13px;color:#cccccc;line-height:1.7;margin:0;white-space:pre-wrap;">${data.message}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr><td bgcolor="#080505" style="background:#080505;height:20px;border-left:1px solid #2a1212;border-right:1px solid #2a1212;">&nbsp;</td></tr>

        <!-- PHOTOS -->
        ${photosHtml}

        <!-- FOOTER -->
        <tr>
          <td bgcolor="#080505" style="background:#080505;border:1px solid #2a1212;border-top:1px solid #1e1212;border-radius:0 0 8px 8px;padding:16px 24px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td>
                  <p style="font-family:Arial,sans-serif;font-size:11px;color:#c0392b;font-weight:700;margin:0;">DRAGON RECREATION SERVICES</p>
                  <p style="font-family:Arial,sans-serif;font-size:11px;color:#444444;margin:4px 0 0;">Inquiry ID: ${data.inquiryId}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>

</body>
</html>`;
}
