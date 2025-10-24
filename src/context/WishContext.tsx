import React, { createContext, useContext, useState, useCallback } from "react";
import type { SortField, SortOrder } from "@/lib/useSortedFilteredWishes";
import { WishIcon, type Wish } from "../types";

interface WishContextType {
  wishes: Wish[];
  loading: boolean;
  error: string | null;
  reloadWishes: () => Promise<void>;
  search: string;
  setSearch: (q: string) => void;
  sortField: SortField;
  setSortField: (f: SortField) => void;
  sortOrder: SortOrder;
  setSortOrder: (o: SortOrder) => void;
  visibleCount: number;
  loadMore: () => void;
}

const WishContext = createContext<WishContextType | undefined>(undefined);

export const useWishContext = () => {
  const ctx = useContext(WishContext);
  if (!ctx) throw new Error("useWishContext must be used within WishProvider");
  return ctx;
};

export const WishProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [visibleCount, setVisibleCount] = useState(4);

  const loadMore = () => setVisibleCount((prev) => prev + 4);

  const reloadWishes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("https://wishestra.onrender.com/wishes");
      if (!res.ok) throw new Error("Failed to load wishes");
      const data = await res.json();
      setWishes(
        data.map((wish: any) => ({
          ...wish,
          image: Object.values(WishIcon).includes(wish.image) ? wish.image : "",
          createdAt: wish.createdAt ? String(wish.createdAt) : undefined,
        }))
      );
    } catch (e: any) {
      setError(e.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    reloadWishes();
  }, [reloadWishes]);

  return (
    <WishContext.Provider
      value={{
        wishes,
        loading,
        error,
        reloadWishes,
        search,
        setSearch,
        sortField,
        setSortField,
        sortOrder,
        setSortOrder,
        visibleCount,
        loadMore,
      }}
    >
      {children}
    </WishContext.Provider>
  );
};
