"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CardLoading from "./CardLoading";

const Cards = ({ data }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadingIndex, setLoadingIndex] = useState(null);

  const handleClick = (e, path, index) => {
    e.preventDefault();
    setLoading(true);
    setLoadingIndex(index);

    setTimeout(() => {
      router.push(path);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-3 gap-3 max-w-[840px] mx-auto mb-48">
      {data.map((item, index) => {
        const formattedDate = new Date(item.tanggal).toLocaleDateString(
          "id-ID",
          {
            year: "numeric",
            month: "short",
            day: "numeric",
          }
        );

        const cardPath = `/detail/berita/${item._id}`;

        return (
          <div key={index} className="relative">
            <div
              className="border rounded-lg shadow-lg p-3 cursor-pointer hover:border-hint"
              onClick={(e) => handleClick(e, cardPath, index)}
            >
              <div className="mb-4">
                <img
                  src={item.gambar}
                  alt={item.judul}
                  className="w-full h-40 object-cover rounded-lg"
                />
              </div>
              <div className="text-center">
                <p className="font-bold text-lg overflow-hidden text-ellipsis line-clamp-2">
                  {item.judul}
                </p>
                <span className="text-hint">{formattedDate}</span>
              </div>
            </div>

            {loading && loadingIndex === index && <CardLoading />}
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
