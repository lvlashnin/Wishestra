import { WishItem } from "./WishItem";
import { useWishContext } from "@/context/WishContext";
import { useSortedFilteredWishes } from "@/lib/useSortedFilteredWishes";
import { Spinner } from "./Spinner";

export const WishList = () => {
  return <WishListContent />;
};

const WishListContent = () => {
  const { wishes, loading, error, search, sortField, sortOrder, visibleCount } =
    useWishContext();
  const sortedWishes = useSortedFilteredWishes(
    wishes,
    search,
    sortField,
    sortOrder
  );

  if (loading) return <Spinner />;
  if (error) return <div className="text-red-500">{error}</div>;
  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] justify-items-center gap-4">
        {sortedWishes.slice(0, visibleCount).map((wish) => (
          <WishItem key={wish.id} {...wish} />
        ))}
      </div>
    </>
  );
};
