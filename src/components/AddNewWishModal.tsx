import * as React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Wish = {
  image: string;
  title: string;
  description: string;
  price: number;
};

type AddNewWishModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (wish: Wish) => void;
  onDelete?: () => void;
  onUpdate?: () => void;
  onDetails?: () => void;
  initialWish?: Partial<Wish>;
};

export const AddNewWishModal: React.FC<AddNewWishModalProps> = ({
  open,
  onOpenChange,
  onSubmit,
  onDelete,
  onUpdate,
  onDetails,
  initialWish = {},
}) => {
  const [image, setImage] = React.useState(initialWish.image || "");
  const [title, setTitle] = React.useState(initialWish.title || "");
  const [description, setDescription] = React.useState(
    initialWish.description || ""
  );
  const [price, setPrice] = React.useState(initialWish.price?.toString() || "");

  React.useEffect(() => {
    setImage(initialWish.image || "");
    setTitle(initialWish.title || "");
    setDescription(initialWish.description || "");
    setPrice(initialWish.price?.toString() || "");
  }, [initialWish, open]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({
      image,
      title,
      description,
      price: Number(price),
    });
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md w-full bg-background rounded-lg p-6 shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold mb-4">
            Add New Wish
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Image URL</label>
            <Input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://..."
              required
            />
            {image && (
              <img
                src={image}
                alt="Wish preview"
                className="mt-2 max-h-32 rounded border"
              />
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
            <div className="flex-1 flex gap-2">
              <Button
                type="button"
                variant="destructive"
                onClick={onDelete}
                className="w-full md:w-auto"
              >
                Delete
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={onUpdate}
                className="w-full md:w-auto"
              >
                Update
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onDetails}
                className="w-full md:w-auto"
              >
                Details
              </Button>
            </div>
            <Button
              type="submit"
              variant="default"
              className="w-full md:w-auto"
            >
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
