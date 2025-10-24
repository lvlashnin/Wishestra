import * as React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { addWish, updateWish } from "@/lib/utils";
import { useWishContext } from "@/context/WishContext";

export enum WishIcon {
  None = "",
  Baby = "Baby",
  Apple = "Apple",
  Car = "Car",
  Dog = "Dog",
  Cat = "Cat",
  Gift = "Gift",
  Heart = "Heart",
  Home = "Home",
  Star = "Star",
  Sun = "Sun",
  Moon = "Moon",
}

type Wish = {
  image: WishIcon;
  title: string;
  description: string;
  price: number;
};

type WishModalMode = "add" | "edit";
type WishModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (wish: Wish) => void;
  mode: WishModalMode;
  wish?: Wish;
};

export const WishModal: React.FC<WishModalProps> = ({
  open,
  onOpenChange,
  onSubmit,
  mode,
  wish,
}) => {
  const [image, setImage] = React.useState<WishIcon | "">(wish?.image || "");

  const iconOptions = [
    { label: "Baby", value: WishIcon.Baby, icon: Baby },
    { label: "Apple", value: WishIcon.Apple, icon: Apple },
    { label: "Car", value: WishIcon.Car, icon: Car },
    { label: "Dog", value: WishIcon.Dog, icon: Dog },
    { label: "Cat", value: WishIcon.Cat, icon: Cat },
    { label: "Gift", value: WishIcon.Gift, icon: Gift },
    { label: "Heart", value: WishIcon.Heart, icon: Heart },
    { label: "Home", value: WishIcon.Home, icon: Home },
    { label: "Star", value: WishIcon.Star, icon: Star },
    { label: "Sun", value: WishIcon.Sun, icon: Sun },
    { label: "Moon", value: WishIcon.Moon, icon: Moon },
  ];
  const [title, setTitle] = React.useState(wish?.title || "");
  const [description, setDescription] = React.useState(wish?.description || "");
  const [price, setPrice] = React.useState(wish?.price?.toString() || "");

  React.useEffect(() => {
    if (mode === "edit" && wish) {
      setImage(wish.image ?? "");
      setTitle(wish.title || "");
      setDescription(wish.description || "");
      setPrice(wish.price?.toString() || "");
    } else if (mode === "add") {
      setImage("");
      setTitle("");
      setDescription("");
      setPrice("");
    }
  }, [wish, mode, open]);

  const { reloadWishes } = useWishContext();
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newWish = {
      image,
      title,
      description,
      price: Number(price),
    };
    if (mode === "add") {
      try {
        await addWish(newWish);
        onSubmit(newWish);
        onOpenChange(false);
        console.log(
          "[WishModal] addWish complete, waiting 1000ms before reloadWishes"
        );
        setTimeout(() => {
          console.log("[WishModal] calling reloadWishes after 1000ms");
          reloadWishes();
        }, 1000);
      } catch (err) {}
    } else if (mode === "edit" && wish?.id) {
      try {
        await updateWish(wish.id, newWish);
        onSubmit(newWish);
        onOpenChange(false);
        reloadWishes();
      } catch (err) {}
    } else {
      onSubmit(newWish);
      onOpenChange(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md w-full bg-background rounded-lg p-6 shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold mb-4">
            {mode === "edit" ? "Edit Wish" : "Add New Wish"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Icon</label>
            <Select
              value={image}
              onValueChange={(v) => setImage(v as WishIcon)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select icon" />
              </SelectTrigger>
              <SelectContent>
                {iconOptions.map((opt) => (
                  <SelectItem
                    key={opt.value}
                    value={opt.value}
                    className="flex items-center gap-2"
                  >
                    <span className="inline-flex items-center gap-2">
                      <opt.icon className="w-5 h-5 mr-2 inline-block" />
                      {opt.label}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {image && (
              <div className="mt-2 flex items-center gap-2">
                {(() => {
                  const IconComp = iconOptions.find(
                    (i) => i.value === image
                  )?.icon;
                  return IconComp ? <IconComp className="w-10 h-10" /> : null;
                })()}
                <span className="text-muted-foreground text-xs">{image}</span>
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <Input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              min={0}
              step={0.01}
              required
            />
          </div>
          <DialogFooter className="flex flex-col md:flex-row gap-2 mt-4">
            {mode === "edit" ? (
              <Button
                type="submit"
                variant="secondary"
                className="w-full md:w-auto"
              >
                Update
              </Button>
            ) : (
              <Button
                type="submit"
                variant="default"
                className="w-full md:w-auto"
              >
                Save
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
