import { Button } from "@/components/ui/button";
import { useWishContext } from "@/context/WishContext";
import { useSortedFilteredWishes } from "@/lib/useSortedFilteredWishes";

export const Pagination = () => {
  const { wishes, search, sortField, sortOrder, visibleCount, loadMore } =
    useWishContext();
  const sortedWishes = useSortedFilteredWishes(
    wishes,
    search,
    sortField,
    sortOrder
  );

  if (visibleCount >= sortedWishes.length) {
    return null;
  }

  return (
    <div className="flex justify-center items-center py-10">
      <Button onClick={loadMore}>More</Button>
    </div>
  );
};
