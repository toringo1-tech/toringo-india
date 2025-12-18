import { NextResponse } from "next/server";
import { products } from "@/lib/products";

export async function GET() {
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  const body = await req.json();

  const product = {
    id: Date.now().toString(),
    name: body.name,
    price: Number(body.price),
    category: body.category,
    image: body.image,
    description: body.description,
    slug: body.slug,
  };

  products.push(product);

  return NextResponse.json({ success: true, product });
}