import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { Plus } from "lucide-react";
import { WishModal } from "./WishModal";
import { useWishContext } from "@/context/WishContext";

export const FilterPanel: React.FC = () => {
  const {
    reloadWishes,
    search,
    setSearch,
    sortField,
    setSortField,
    sortOrder,
    setSortOrder,
  } = useWishContext();
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleDateSort = (value: "oldest" | "newest") => {
    setSortField("createdAt");
    setSortOrder(value === "newest" ? "desc" : "asc");
  };
  const handlePriceSort = (value: "high-to-low" | "low-to-high") => {
    setSortField("price");
    setSortOrder(value === "high-to-low" ? "desc" : "asc");
  };

  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 w-full py-10">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search wishes..."
        className="border border-input rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground min-w-[180px] md:min-w-[180px] w-full md:w-auto"
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            Date:{" "}
            {sortField === "createdAt" && sortOrder === "desc"
              ? "Newest"
              : "Oldest"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onSelect={() => handleDateSort("newest")}>
            Newest
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => handleDateSort("oldest")}>
            Oldest
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            Price:{" "}
            {sortField === "price" && sortOrder === "desc"
              ? "High to low"
              : "Low to high"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onSelect={() => handlePriceSort("high-to-low")}>
            High to low
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => handlePriceSort("low-to-high")}>
            Low to high
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        size="sm"
        onClick={() => setModalOpen(true)}
        variant="default"
        className="md:ml-auto flex items-center gap-1 w-full md:w-auto"
      >
        <Plus className="w-4 h-4 mr-1" /> Add new wish
      </Button>
      <WishModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        onSubmit={() => {
          setModalOpen(false);
          reloadWishes();
        }}
        mode="add"
      />
    </div>
  );
};
