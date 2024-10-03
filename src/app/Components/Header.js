"use client";
import { useState, useEffect } from "react";
import CategoryScroll from "./CategoryScroll";
import Nav from "./Nav";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/checkAuth`
        );
        if (res.ok) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Failed to check login status:", error);
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <header className="flex flex-col justify-center text-center px-5">
      <Nav isLoggedIn={isLoggedIn} />
      <CategoryScroll />
    </header>
  );
}
