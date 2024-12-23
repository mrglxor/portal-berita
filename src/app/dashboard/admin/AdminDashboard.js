"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AdminDashboard({ user }) {
  const [loading, setLoading] = useState(true); // Start loading as true
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [articles, setArticles] = useState([]);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(`/api/articles?status=draft`);
        const data = await res.json();

        if (data.success) {
          setArticles(data.data.articles || []); // Access articles correctly
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      } finally {
        setLoading(false); // Set loading to false after the request completes
      }
    };

    fetchArticles();
  }, []);

  if (loading) return <p>Loading...</p>;

  const handleLogout = async () => {
    setLoading(true);
    await fetch("/api/auth/logout", {
      method: "POST",
    });
    setLoading(false);
    router.push("/");
  };

  const handleAgree = async (articleId, e) => {
    e.preventDefault();
    const confirmation = confirm("Terbitkan berita ini?");
    if (!confirmation) return;

    const response = await fetch(`/api/articles/agree/${articleId}`, {
      method: "POST",
    });

    if (response.ok) {
      window.location.reload();
    } else {
      const errorData = await response.json();
      alert(errorData.message || "Terjadi kesalahan saat menyetujui artikel.");
    }
  };

  return (
    <div className="flex h-screen">
      <button
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>

      <div
        className={`fixed inset-y-0 left-0 bg-gray-800 text-white w-64 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform lg:translate-x-0`}
      >
        <div className="p-5 relative">
          <h2 className="text-2xl font-bold">
            <a href="/dashboard">Admin</a>
          </h2>
          <button
            className="absolute top-4 right-4 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <nav>
          <ul>
            <li>
              <a
                href="/dashboard"
                className={`block p-4 hover:bg-gray-700 ${
                  pathname === "/dashboard" ? "bg-gray-700" : ""
                }`}
              >
                Drafted News
              </a>
            </li>
            <li>
              <a href="/berita/master" className="block p-4 hover:bg-gray-700">
                Published News
              </a>
            </li>
            <li>
              <a href="#" className="block p-4 hover:bg-gray-700">
                <span className="text-amber-600">Monetization Sys</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className={`flex-1 ml-0 lg:ml-64 transition-all`}>
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <a href="/">
              <img
                src="/logo.svg"
                alt="Logo"
                width={0}
                height={0}
                className="w-full h-full"
              />
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span>{user.nama}</span>
              <img
                src={user.gambar}
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={handleLogout}
            >
              {loading ? "Logouting..." : "Logout"}
            </button>
          </div>
        </header>

        <main className="p-4 flex-1">
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">Berita Drafted</h2>
            <div className="overflow-x-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                {articles.length === 0 ? (
                  <p>Berita drafted masih kosong!</p>
                ) : (
                  articles.map((article) => (
                    <div
                      key={article._id}
                      className="border rounded-lg shadow-lg p-4 hover:border-gray-800"
                    >
                      <img
                        src={article.gambar}
                        alt={article.judul}
                        className="w-full h-48 object-cover mb-4 rounded-lg"
                      />
                      <h3 className="text-lg font-bold mb-2 line-clamp-3">
                        {article.judul}
                      </h3>
                      <p className="text-xs text-gray-800 mb-2 line-clamp-2">
                        {new Date(article.tanggal).toLocaleDateString()} -{" "}
                        {article.kategori} -{" "}
                        <a
                          href={`/detail/berita/${article._id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Lihat detail
                        </a>
                      </p>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {article.isinya}
                      </p>
                      <p
                        className={`text-sm font-medium mb-5 ${
                          article.status === "published"
                            ? "text-green-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {article.status === "published"
                          ? "Sudah disetujui oleh admin"
                          : "Belum disetujui oleh admin"}
                      </p>
                      <div className="gap-x-3 flex">
                        <button
                          type="submit"
                          onClick={(e) => handleAgree(article._id, e)}
                          className="bg-green-500 border border-green-500 text-white px-3 py-1 rounded hover:text-green-500 hover:bg-white"
                        >
                          Setujui
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
