"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard({ user }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);
    await fetch("/api/auth/logout", {
      method: "POST",
    });
    setLoading(false);
    router.push("/auth");
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Selamat datang Admin, {user.nama}!</p>
      <p>Ada 10 drafted terbaru! cek sekarang.</p>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white py-2 px-4 rounded"
      >
        {loading ? "Logging out..." : "Logout"}
      </button>
    </div>
  );
}
