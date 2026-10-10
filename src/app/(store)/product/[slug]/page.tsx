import { api } from "@/data/api";
import type { Product } from "@/data/types/product";
import Image from "next/image";
import { Suspense } from "react";

interface ProductProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getProduct(slug: string): Promise<Product> {
  const response = await api(`/products/${slug}`, {
    next: {
      revalidate: 60 * 60, // 1 hora
    },
  });

  const products = await response.json();

  return products;
}

export default function ProductPage({ params }: ProductProps) {
  return (
    <Suspense
      fallback={
        <div className="relative grid max-h-215 grid-cols-3">
          <div className="col-span-2 h-190 animate-pulse rounded-md bg-zinc-50/10" />
          <div className="flex flex-col justify-center gap-4 px-12">
            <div className="h-9 w-3/4 animate-pulse rounded-md bg-zinc-50/10" />
            <div className="h-16 animate-pulse rounded-md bg-zinc-50/10" />
            <div className="mt-4 h-10 w-1/2 animate-pulse rounded-full bg-zinc-50/10" />
            <div className="mt-4 h-10 animate-pulse rounded-md bg-zinc-50/10" />
            <div className="mt-4 h-12 animate-pulse rounded-full bg-zinc-50/10" />
          </div>
        </div>
      }
    >
      <ProductContent params={params} />
    </Suspense>
  );
}

async function ProductContent({ params }: ProductProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  return (
    <div className="relative grid max-h-215 grid-cols-3">
      <div className="col-span-2 overflow-hidden">
        <Image
          src={product.image}
          alt=""
          width={1000}
          height={1000}
          quality={100}
        />
      </div>

      <div className="flex flex-col justify-center px-12">
        <h1 className="text-3xl font-bold leading-tight">{product.title}</h1>

        <p className="mt-2 leading-relaxed text-zinc-400">
          {product.description}
        </p>

        <div className="mt-8 flex items-center gap-3">
          <span className="inline-block rounded-full bg-violet-500 px-5 py-2.5 font-semibold">
            {product.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </span>
          <span className="text-sm text-zinc-400">
            Em 12x s/ juros de{" "}
            {(product.price / 12).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </div>

        <div className="mt-8 space-y-4">
          <span className="block font-semibold">Tamanhos</span>

          <div className="flex gap-2">
            <button
              type="button"
              className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-700 text-sm font-semibold"
            >
              P
            </button>
            <button
              type="button"
              className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-700 text-sm font-semibold"
            >
              M
            </button>
            <button
              type="button"
              className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-700 text-sm font-semibold"
            >
              G
            </button>
            <button
              type="button"
              className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-700 text-sm font-semibold"
            >
              GG
            </button>
          </div>
        </div>

        <button
          type="button"
          className="mt-8 flex h-12 items-center justify-center rounded-full bg-emerald-600 font-semibold text-white"
        >
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  );
}
