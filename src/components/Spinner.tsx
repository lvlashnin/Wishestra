import { Loader2 } from "lucide-react";

export const Spinner = ({ className }: { className?: string }) => {
  return (
    <div className="flex justify-center items-center py-8">
      <Loader2 className={`h-16 w-16 animate-spin ${className}`} />
    </div>
  );
};
