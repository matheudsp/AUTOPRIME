"use client";

import { useEffect, useState } from "react";
import { HiMoon, HiSun } from "react-icons/hi";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";

interface ThemeSwitcherProps {
  size: "sm" | "lg" | "icon" | "default" | null | undefined;
  variant:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
}

const ThemeSwitcher = ({ size, variant }: ThemeSwitcherProps) => {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Garante que o tema só será acessado no client
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Evita erro de hidratação

  return (
    <Button
      variant={variant}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      size={size}
      className="rounded-full text-black dark:text-white/70"
    >
      {theme === "dark" ? (
        <HiSun size={25} className="ml-2 text-white/70" />
      ) : (
        <HiMoon size={25} className="ml-2" />
      )}
    </Button>
  );
};

export default ThemeSwitcher;
