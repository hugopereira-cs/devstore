import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { api } from "@/data/api";
import type { Product } from "@/data/types/product";

interface SearchPageProps {
  searchParams: Promise<{
    q?: string | string[];
  }>;
}

async function getProducts(query: string): Promise<Product[]> {
  const search = new URLSearchParams({ q: query });
  const response = await api(`/products/search?${search.toString()}`);

  if (!response.ok) {
    throw new Error(
      `A busca falhou: ${response.status} ${response.statusText}`,
    );
  }

  return response.json();
}

export default async function Search({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q.trim() : "";

  if (!query) {
    redirect("/");
  }

  const products = await getProducts(query);

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">
        Resultados para: <span className="font-semibold">{query}</span>
      </p>

      {products.length > 0 ? (
        <div className="grid grid-cols-3 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="group relative flex items-end justify-center overflow-hidden rounded-lg bg-zinc-900"
            >
              <Image
                src={product.image}
                className="transition-transform duration-500 group-hover:scale-105"
                width={480}
                height={480}
                quality={100}
                alt={product.title}
              />

              <div className="absolute bottom-8 flex h-12 max-w-70 items-center gap-2 rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
                <span className="truncate text-sm">{product.title}</span>
                <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
                  {product.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-sm text-zinc-400">
          {query
            ? "Nenhum produto encontrado."
            : "Digite um termo para buscar produtos."}
        </p>
      )}
    </div>
  );
}
