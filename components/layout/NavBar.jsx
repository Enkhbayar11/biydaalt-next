"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "../ui/Button";
import { useAppContext } from "../../context/AppContext";

export default function NavBar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useAppContext();

  const links = [
    { href: "/tasks", label: "Tasks" },
    { href: "/notes", label: "Notes" },
    { href: "/about", label: "About" },
  ];

  return (
    <header className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <nav className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="text-xl font-bold text-blue-600">
          Mini TaskHub
        </Link>

        <div className="flex flex-wrap items-center gap-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-3 py-2 text-sm font-medium ${
                pathname === link.href
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <Button variant="secondary" onClick={toggleTheme}>
            {theme === "light" ? "Dark" : "Light"}
          </Button>
        </div>
      </nav>
    </header>
  );
}
