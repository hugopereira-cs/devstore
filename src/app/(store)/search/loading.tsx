"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Skeleton } from "@/components/skeleton";

export default function SearchLoading() {
  return (
    <Suspense fallback={<SearchResultsSkeleton query="" />}>
      <SearchLoadingContent />
    </Suspense>
  );
}

function SearchLoadingContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  return <SearchResultsSkeleton query={query ?? ""} />;
}

function SearchResultsSkeleton({ query }: { query: string }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">
        Resultados para: <span className="font-semibold">{query}</span>
      </p>

      <div className="grid grid-cols-3 gap-6">
        <Skeleton className="h-95" />
        <Skeleton className="h-95" />
        <Skeleton className="h-95" />
        <Skeleton className="h-95" />
        <Skeleton className="h-95" />
        <Skeleton className="h-95" />
      </div>
    </div>
  );
}
