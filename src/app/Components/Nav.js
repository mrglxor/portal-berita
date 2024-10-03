"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaSearch, FaFileAlt } from "react-icons/fa";

const Nav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const savedSearch = localStorage.getItem("searchInput");
    if (savedSearch) {
      setSearchQuery(savedSearch);
    }
  }, []);

  const handleSearchChange = async (event) => {
    const value = event.target.value;
    setSearchQuery(value);

    if (value) {
      const res = await fetch(`/api/search?query=${value}`);
      const data = await res.json();
      setSearchResults(data.results);
    } else {
      setSearchResults([]);
      localStorage.removeItem("searchInput");
    }
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("searchInput", searchQuery);
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center text-center mt-5 items-center gap-y-2 lg:gap-x-9 lg:h-[50px] h-auto search-bar">
      <Link href={"/"}>
        <Image
          src={"/logo.svg"}
          width={0}
          height={0}
          alt="Logo PORT"
          className="inline-block w-auto h-auto"
        />
      </Link>

      <div className="hidden lg:block">
        <Image
          src={"/line.svg"}
          width={0}
          height={0}
          alt="Line"
          className="inline-block w-auto h-auto"
        />
      </div>

      <div className="w-full max-w-[450px]">
        <form onSubmit={handleSearchSubmit} className="relative">
          <div className="search-bar rounded-3xl h-[50px] flex items-center justify-between p-4 border border-border focus-within:border-primary">
            <FaSearch className="text-hint fa-search" />
            <input
              type="text"
              className="w-full h-[45px] rounded-3xl outline-none font-semibold px-2 caret-dark text-lg"
              placeholder="Search hot trendy news today..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          {searchResults.length > 0 && (
            <div className="absolute bg-white border border-border rounded-lg shadow-lg mt-2 w-full max-w-[450px] z-10 max-h-60 overflow-y-auto">
              {searchResults.map((article) => (
                <Link
                  key={article._id}
                  href={`/detail/berita/${article._id}`}
                  onClick={() =>
                    localStorage.setItem("searchInput", article.judul)
                  }
                  className="block p-2 hover:bg-gray-100"
                >
                  {article.judul} -{" "}
                  <span className="text-blue-600">Lihat lebih lanjut</span>
                </Link>
              ))}
              <p className="p-3 text-hint hover:text-dark">
                Portal Berita PORT - 2024
              </p>
            </div>
          )}
        </form>
      </div>

      <div className="flex gap-3 lg:mt-0">
        {isLoggedIn ? (
          <Link
            href="/dashboard"
            className="bg-primary text-light px-4 py-2 rounded-full flex items-center gap-2 font-bold"
          >
            DASHBOARD
          </Link>
        ) : (
          <Link
            href="/auth"
            className="bg-transparent border border-border px-4 py-2 rounded-full hover:bg-primary hover:text-light hover:border-light font-bold"
          >
            MASUK
          </Link>
        )}
        <Link
          href="https://github.com/mrglxor/portal-berita"
          target="_blank"
          className="bg-primary text-light px-4 py-2 rounded-full flex items-center gap-2 font-bold"
        >
          <FaFileAlt /> DOC
        </Link>
      </div>
    </div>
  );
};

export default Nav;
