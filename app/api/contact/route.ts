import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";
import { getResend, buildInquiryEmailHtml } from "@/lib/resend";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = (formData.get("phone") as string) || "";
    const projectType = formData.get("projectType") as string;
    const title = formData.get("title") as string;
    const message = formData.get("message") as string;
    const imageFiles = formData.getAll("images") as File[];

    if (!name || !email || !projectType || !title || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const db = createServiceClient();
    const imageUrls: string[] = [];

    // Upload images to Supabase Storage
    for (const file of imageFiles) {
      if (!file.size) continue;
      const ext = file.name.split(".").pop() || "jpg";
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const { error: uploadError } = await db.storage
        .from("inquiry-images")
        .upload(fileName, buffer, {
          contentType: file.type,
          upsert: false,
        });

      if (!uploadError) {
        const { data: urlData } = db.storage
          .from("inquiry-images")
          .getPublicUrl(fileName);
        imageUrls.push(urlData.publicUrl);
      }
    }

    // Insert inquiry into DB
    const { data: inquiry, error: dbError } = await db
      .from("inquiries")
      .insert({
        name,
        email,
        phone,
        project_type: projectType,
        title,
        message,
        image_urls: imageUrls,
        status: "unread",
      })
      .select("id")
      .single();

    if (dbError) {
      console.error("DB insert error:", dbError);
      return NextResponse.json({ error: "Failed to save inquiry" }, { status: 500 });
    }

    // Get recipient emails from settings
    const { data: settings } = await db
      .from("admin_settings")
      .select("value")
      .eq("key", "recipient_emails")
      .single();

    const recipients = settings?.value
      ? settings.value.split(",").map((e: string) => e.trim()).filter(Boolean)
      : [];

    // Send email notification
    if (recipients.length > 0) {
      await getResend().emails.send({
        from: "Dragon Recreation Services <onboarding@resend.dev>",
        to: recipients,
        replyTo: email,
        subject: `New Quote Request: ${title}`,
        html: buildInquiryEmailHtml({
          name,
          email,
          phone,
          projectType,
          title,
          message,
          imageUrls,
          inquiryId: inquiry.id,
        }),
      });
    }

    return NextResponse.json({ success: true, id: inquiry.id });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
