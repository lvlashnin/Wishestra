import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import logo from "../assets/logo-2.png";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="container flex h-16 items-center justify-between">
        <a
          href="/"
          className="flex items-center justify-center gap-2 font-bold text-lg transition-colors hover:text-foreground/80"
        >
          <img src={logo} alt="logo" className="h-10 w-auto" />
          <span className="text-foreground pt-2 hidden md:inline">
            Wishestra
          </span>
        </a>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button className="cursor-pointer transition-opacity hover:opacity-80">
            Log In
          </Button>
        </div>
      </div>
    </header>
  );
};
