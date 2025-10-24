import { Button } from "@/components/ui/button";
import { useState } from "react";
import { WishModal, WishIcon } from "./WishModal";
import { deleteWish } from "@/lib/utils";
import { useWishContext } from "@/context/WishContext";

export type Wish = {
  id?: number;
  image: WishIcon;
  title: string;
  description: string;
  price: number;
  createdAt?: string;
};

import {
  Baby,
  Apple,
  Car,
  Dog,
  Cat,
  Gift,
  Heart,
  Home,
  Star,
  Sun,
  Moon,
} from "lucide-react";

const iconMap = {
  [WishIcon.Baby]: Baby,
  [WishIcon.Apple]: Apple,
  [WishIcon.Car]: Car,
  [WishIcon.Dog]: Dog,
  [WishIcon.Cat]: Cat,
  [WishIcon.Gift]: Gift,
  [WishIcon.Heart]: Heart,
  [WishIcon.Home]: Home,
  [WishIcon.Star]: Star,
  [WishIcon.Sun]: Sun,
  [WishIcon.Moon]: Moon,
};

export const WishItem: React.FC<Wish> = ({
  id,
  image,
  title,
  description,
  price,
  createdAt,
}) => {
  const [editOpen, setEditOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { reloadWishes } = useWishContext();

  const handleDelete = async () => {
    if (!id || deleting) return;
    setDeleting(true);
    setError(null);
    try {
      await deleteWish(id);
      await reloadWishes();
    } catch (err: any) {
      setError(err?.message || "Failed to delete");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <div className="bg-card rounded-lg shadow p-4 max-w-xs w-full flex flex-col items-start">
        <div className="flex items-center justify-center mb-3 h-40">
          {(() => {
            const IconComp = iconMap[image as WishIcon];
            return IconComp ? <IconComp className="w-20 h-20" /> : null;
          })()}
        </div>
        <h3 className="font-bold text-lg mb-1">{title}</h3>
        <p className="text-muted-foreground text-sm mb-2">{description}</p>
        <div className="font-semibold text-primary text-base mb-4">
          ${price}
        </div>
        <div className="flex gap-2 items-center mt-auto">
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete"}
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setEditOpen(true)}
            disabled={deleting}
          >
            Update
          </Button>
          <p className="text-muted-foreground text-sm">
            {createdAt
              ? (() => {
                  const d = new Date(createdAt);
                  const day = d.getDate().toString().padStart(2, "0");
                  const month = (d.getMonth() + 1).toString().padStart(2, "0");
                  const year = d.getFullYear().toString().slice(-2);
                  return `Created: ${day}.${month}.${year}`;
                })()
              : "Created: —"}
          </p>
        </div>
        {error && <div className="text-red-500 text-xs mt-2">{error}</div>}
      </div>
      <WishModal
        open={editOpen}
        onOpenChange={setEditOpen}
        onSubmit={() => setEditOpen(false)}
        mode="edit"
        wish={{ id, image, title, description, price }}
      />
    </>
  );
};
