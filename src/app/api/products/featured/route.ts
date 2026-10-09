import data from "../data.json";

// Rota para produtos em destaque
export function GET() {
  const featuredProducts = data.products.filter(
    (products) => products.featured
  );

  return Response.json(featuredProducts);
}
