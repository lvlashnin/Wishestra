import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { Plus } from "lucide-react";
import { AddNewWishModal } from "./AddNewWishModal";

type FilterPanelProps = {
  onDateSortChange?: (value: "oldest" | "newest") => void;
  onPriceSortChange?: (value: "high-to-low" | "low-to-high") => void;
  onAddWish?: () => void;
  onSearchChange?: (value: string) => void;
};

export const FilterPanel: React.FC<FilterPanelProps> = ({
  onDateSortChange,
  onPriceSortChange,
  onAddWish,
  onSearchChange,
}) => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [dateSort, setDateSort] = React.useState<"oldest" | "newest">("newest");
  const [priceSort, setPriceSort] = React.useState<
    "high-to-low" | "low-to-high"
  >("high-to-low");

  const handleDateSort = (value: "oldest" | "newest") => {
    setDateSort(value);
    onDateSortChange?.(value);
  };
  const handlePriceSort = (value: "high-to-low" | "low-to-high") => {
    setPriceSort(value);
    onPriceSortChange?.(value);
  };

  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 w-full py-10">
      <input
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          if (typeof onSearchChange === "function")
            onSearchChange(e.target.value);
        }}
        placeholder="Search wishes..."
        className="border border-input rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground min-w-[180px] md:min-w-[180px] w-full md:w-auto"
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            Date: {dateSort === "newest" ? "Newest" : "Oldest"}
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
            Price: {priceSort === "high-to-low" ? "High to low" : "Low to high"}
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

      {/* Add new wish button */}
      <Button
        size="sm"
        onClick={() => setModalOpen(true)}
        variant="default"
        className="md:ml-auto flex items-center gap-1 w-full md:w-auto"
      >
        <Plus className="w-4 h-4 mr-1" /> Add new wish
      </Button>
      <AddNewWishModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        onSubmit={(wish) => {
          setModalOpen(false);
          // Optionally call onAddWish or handle wish here
        }}
      />
    </div>
  );
};
