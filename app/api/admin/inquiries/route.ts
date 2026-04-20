import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";

function checkAuth(req: NextRequest) {
  const token = req.headers.get("x-admin-token");
  return token === process.env.ADMIN_PASSWORD;
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const db = createServiceClient();
  const { data, error } = await db
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const db = createServiceClient();
  const { error } = await db.from("inquiries").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
