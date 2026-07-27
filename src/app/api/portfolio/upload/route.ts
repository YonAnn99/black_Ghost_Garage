import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { createClient } from "@/lib/supabase-server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const validTypes = ["image/webp", "image/jpeg", "image/png"];
  if (!validTypes.includes(file.type)) {
    return NextResponse.json(
      { error: "Invalid file type. Use WebP, JPG or PNG." },
      { status: 400 }
    );
  }

  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json(
      { error: "File too large. Max 5MB." },
      { status: 400 }
    );
  }

  const inputBuffer = Buffer.from(await file.arrayBuffer());

  const webpBuffer = await sharp(inputBuffer)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 82, effort: 6 })
    .toBuffer();

  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.webp`;

  const { error } = await supabase.storage
    .from("portfolio")
    .upload(fileName, webpBuffer, {
      contentType: "image/webp",
      cacheControl: "31536000",
    });

  if (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data: urlData } = supabase.storage
    .from("portfolio")
    .getPublicUrl(fileName);

  return NextResponse.json({
    url: urlData.publicUrl,
    info: {
      originalSize: `${(file.size / 1024).toFixed(1)} KB`,
      webpSize: `${(webpBuffer.length / 1024).toFixed(1)} KB`,
      savings: `${Math.round((1 - webpBuffer.length / file.size) * 100)}%`,
    },
  });
}
