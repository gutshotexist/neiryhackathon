import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const BottomNavBar = () => {
  const router = useRouter();

  const isActive = (path) => router.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white p-3 flex justify-around text-base rounded-full shadow-lg mb-4 mx-6">
      <Link
        href="/"
        className={`flex flex-col items-center ${
          isActive("/") ? "text-blue-500" : "text-gray-400"
        }`}
      >
        <span className="text-2xl mb-1">🏠</span>
        <span className="text-xs">Главная</span>
      </Link>
      <Link
        href="/stats"
        className={`flex flex-col items-center ${
          isActive("/stats") ? "text-blue-500" : "text-gray-400"
        }`}
      >
        <span className="text-2xl mb-1">📊</span>
        <span className="text-xs">Статистика</span>
      </Link>
      <Link
        href="/achievements"
        className={`flex flex-col items-center ${
          isActive("/achievements") ? "text-blue-500" : "text-gray-400"
        }`}
      >
        <span className="text-2xl mb-1">🏆</span>
        <span className="text-xs">Достижения</span>
      </Link>
      <Link
        href="/profile"
        className={`flex flex-col items-center ${
          isActive("/profile") ? "text-blue-500" : "text-gray-400"
        }`}
      >
        <span className="text-2xl mb-1">👤</span>
        <span className="text-xs">Профиль</span>
      </Link>
    </nav>
  );
};

export default BottomNavBar;
