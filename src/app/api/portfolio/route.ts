import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import { createClient as createBrowserClient } from "@/lib/supabase";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const supabase = createBrowserClient();

  let query = supabase
    .from("portfolio")
    .select("*")
    .order("sort_order", { ascending: true });

  if (category && category !== "Todos") {
    query = query.eq("category", category);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Supabase error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const items = (data || []).map((item) => ({
    id: item.unit_id,
    title: item.title,
    category: item.category,
    description: item.description,
    image: item.image_url || "/images/gallery-placeholder.svg",
    tags: item.tags || [],
    featured: item.featured,
  }));

  return NextResponse.json(items);
}

export async function POST(request: NextRequest) {
  const supabaseServer = await createClient();

  const {
    data: { user },
  } = await supabaseServer.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { title, category, description, tags, image_url, sort_order } = body;

  if (!title || !category || !description) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const { data, error } = await supabaseServer
    .from("portfolio")
    .insert({
      unit_id: `g-${Date.now()}`,
      title,
      category,
      description,
      tags: tags || [],
      image_url: image_url || null,
      sort_order: sort_order || 0,
    })
    .select()
    .single();

  if (error) {
    console.error("Supabase insert error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  const supabaseServer = await createClient();

  const {
    data: { user },
  } = await supabaseServer.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const unitId = searchParams.get("id");

  if (!unitId) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const { data: item } = await supabaseServer
    .from("portfolio")
    .select("image_url")
    .eq("unit_id", unitId)
    .single();

  if (item?.image_url && item.image_url.includes("supabase.co")) {
    const imagePath = item.image_url.split("/portfolio/")[1];
    if (imagePath) {
      await supabaseServer.storage.from("portfolio").remove([imagePath]);
    }
  }

  const { error } = await supabaseServer
    .from("portfolio")
    .delete()
    .eq("unit_id", unitId);

  if (error) {
    console.error("Supabase delete error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
