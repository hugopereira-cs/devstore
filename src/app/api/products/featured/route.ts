import data from "../data.json";

// Rota para produtos em destaque
export async function GET() {
  const featuredProducts = data.products.filter(
    (products) => products.featured
  );

  return Response.json(featuredProducts);
}
