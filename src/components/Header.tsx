import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import logoLight from "../assets/logo-light.png";
import logoDark from "../assets/logo-dark.png";
import { useEffect, useState } from "react";

export const Header = () => {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const check = () => {
      if (typeof window !== "undefined") {
        setIsDark(document.documentElement.classList.contains("dark"));
      }
    };
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header className="top-0 z-50 w-full">
      <div className="flex h-16 items-center justify-between w-full">
        <a
          href="/"
          className="flex items-center justify-center gap-2 font-bold text-lg transition-colors hover:text-foreground/80"
        >
          <img
            src={isDark ? logoLight : logoDark}
            alt="logo"
            className="h-10 w-auto"
          />
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
