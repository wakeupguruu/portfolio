"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
export default function NavBar() {
    const pathname = usePathname();
    return (
    <header className="header">
        <Link
            href="/"
            className="text-2xl font-bold text-gray-800 dark:text-white">
            <p className="blue-gradient_text">Home</p>
        </Link>
        <nav className="flex text-lg gap-7 font-medium">
        <Link
              href="/about"
             className={pathname === "/about" ? "text-blue-600 font-bold" : "text-gray-600"}
            >
            About
        </Link>

        <Link
              href="/about"
  className={pathname === "/contact" ? "text-blue-600 font-bold" : "text-gray-600"}            >
            Contact
        </Link>


        </nav>
    </header>
  );
}