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
          <img src="${url}" width="160" height="120" style="object-fit:cover;border-radius:6px;border:1px solid #333;" alt="Photo ${i + 1}" />
        </a>`
    )
    .join("");

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="font-family:Arial,sans-serif;background:#0a0a0a;color:#f0f0f0;margin:0;padding:0;">
  <div style="max-width:600px;margin:0 auto;padding:32px 20px;">
    <div style="background:linear-gradient(135deg,#c0392b,#f0a500);padding:20px 24px;border-radius:10px 10px 0 0;">
      <h1 style="margin:0;color:white;font-size:22px;font-weight:900;">New Quote Request</h1>
      <p style="margin:4px 0 0;color:rgba(255,255,255,0.8);font-size:14px;">Dragon Recreation Services</p>
    </div>
    <div style="background:#111;border:1px solid #2a2a2a;border-top:none;border-radius:0 0 10px 10px;padding:28px 24px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:8px 0;color:#888;font-size:13px;width:130px;">Name</td><td style="padding:8px 0;color:#f0f0f0;font-size:14px;font-weight:600;">${data.name}</td></tr>
        <tr><td style="padding:8px 0;color:#888;font-size:13px;">Email</td><td style="padding:8px 0;"><a href="mailto:${data.email}" style="color:#f0a500;font-size:14px;">${data.email}</a></td></tr>
        <tr><td style="padding:8px 0;color:#888;font-size:13px;">Phone</td><td style="padding:8px 0;color:#f0f0f0;font-size:14px;">${data.phone || "—"}</td></tr>
        <tr><td style="padding:8px 0;color:#888;font-size:13px;">Project Type</td><td style="padding:8px 0;color:#f0f0f0;font-size:14px;">${data.projectType}</td></tr>
        <tr><td style="padding:8px 0;color:#888;font-size:13px;">Subject</td><td style="padding:8px 0;color:#f0f0f0;font-size:14px;font-weight:600;">${data.title}</td></tr>
      </table>
      <hr style="border:none;border-top:1px solid #2a2a2a;margin:16px 0;" />
      <p style="color:#888;font-size:13px;margin:0 0 8px;">Message</p>
      <p style="color:#f0f0f0;font-size:14px;line-height:1.6;white-space:pre-wrap;">${data.message}</p>
      ${data.imageUrls.length > 0 ? `
      <hr style="border:none;border-top:1px solid #2a2a2a;margin:16px 0;" />
      <p style="color:#888;font-size:13px;margin:0 0 12px;">Attached Photos (${data.imageUrls.length})</p>
      <div>${imageLinks}</div>
      ` : ""}
      <hr style="border:none;border-top:1px solid #2a2a2a;margin:24px 0 16px;" />
      <p style="color:#555;font-size:12px;margin:0;">Inquiry ID: ${data.inquiryId}</p>
    </div>
  </div>
</body>
</html>`;
}
