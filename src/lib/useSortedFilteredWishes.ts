import { useMemo } from "react";

export type SortField = "createdAt" | "price";
export type SortOrder = "asc" | "desc";

export function useSortedFilteredWishes<
  T extends { title: string; createdAt?: string; price: number }
>(wishes: T[], search: string, sortField: SortField, sortOrder: SortOrder) {
  return useMemo(() => {
    let filtered = wishes;
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      filtered = filtered.filter((w) => w.title.toLowerCase().includes(q));
    }
    const sorted = [...filtered].sort((a, b) => {
      if (sortField === "createdAt") {
        if (!a.createdAt) return 1;
        if (!b.createdAt) return -1;

        const aDate = new Date(a.createdAt).getTime();
        const bDate = new Date(b.createdAt).getTime();
        return sortOrder === "asc" ? aDate - bDate : bDate - aDate;
      } else if (sortField === "price") {
        return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
      }
      return 0;
    });
    return sorted;
  }, [wishes, search, sortField, sortOrder]);
}
