import z from "zod";
import data from "../data.json";
import { NextResponse } from "next/server";

// Rota para produtos em destaque
export async function GET(
  _: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const product = data.products.find((product) => product.slug === slug);

  if (!product) {
    return NextResponse.json(
      { error: "Product not found" },
      { status: 400 }
    );
  }

  return Response.json(product);
}
