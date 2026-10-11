"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import type { SubmitEvent } from "react";
import { Suspense } from "react";

export function SearchForm() {
  return (
    <Suspense fallback={<SearchFormFallback />}>
      <SearchFormContent />
    </Suspense>
  );
}

function SearchFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.get("q");

  function handleSearch(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const query = formData.get("q");

    if (typeof query !== "string" || !query.trim()) {
      return;
    }

    const searchParams = new URLSearchParams({ q: query.trim() });
    router.push(`/search?${searchParams.toString()}`);
  }

  return (
    <form
      onSubmit={handleSearch}
      className="flex w-[320] items-center gap-3 rounded-full bg-zinc-900 px-5 py-3 ring-zinc-700"
    >
      <Search className="w-5 h-5 text-zinc-500" />
      <input
        name="q"
        defaultValue={query ?? ""}
        placeholder="Buscar produtos..."
        className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500"
      />
    </form>
  );
}

function SearchFormFallback() {
  return (
    <form className="flex w-[320] items-center gap-3 rounded-full bg-zinc-900 px-5 py-3 ring-zinc-700">
      <Search className="w-5 h-5 text-zinc-500" />
      <input
        name="q"
        placeholder="Buscar produtos..."
        className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500"
      />
    </form>
  );
}
