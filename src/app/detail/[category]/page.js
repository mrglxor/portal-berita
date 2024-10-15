"use client";
import Header from "@/app/Components/Header";
import Cards from "@/app/Components/Cards";
import Footer from "@/app/Components/Footer";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CategoryDetail() {
  const params = useParams();
  const { category } = params;
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(`/api/articles?category=${category}&status=published`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch data for category: ${category}`);
        }

        const data = await res.json();
        setArticles(data?.data?.articles || []);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchArticles();
  }, [category]);

  return (
    <div>
      <Header />
      <div className="flex justify-center w-full lg:w-[500px] text-center mx-auto my-2">
        <h1 className="text-2xl md:text-4xl lg:text-5xl">
          Explore Our <span className="capitalize">{category}</span> News
        </h1>
      </div>
      <Cards data={articles} />
      <Footer />
    </div>
  );
}
