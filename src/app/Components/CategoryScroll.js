"use client";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import LoadingOrError from "./LoadingOrError";
import {
  FaGlobe,
  FaCar,
  FaHeartbeat,
  FaLandmark,
  FaBuilding,
  FaDumbbell,
  FaUtensils,
} from "react-icons/fa";

const CategoryScroll = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const isActive = (path) => pathname === path;

  const handleClick = (e, path) => {
    e.preventDefault();
    setLoading(true);
    router.push(path);
  };

  const categories = [
    {
      path: "/detail/entertainment",
      icon: <FaGlobe />,
      label: "Entertainment",
    },
    { path: "/detail/automotive", icon: <FaCar />, label: "Automotive" },
    { path: "/detail/health", icon: <FaHeartbeat />, label: "Health" },
    { path: "/detail/politics", icon: <FaLandmark />, label: "Politics" },
    { path: "/detail/business", icon: <FaBuilding />, label: "Business" },
    { path: "/detail/sport", icon: <FaDumbbell />, label: "Sport" },
    { path: "/detail/foods", icon: <FaUtensils />, label: "Foods" },
  ];

  return (
    <div className="relative">
      {loading && <LoadingOrError loading={true} error={null} />}

      <div className="overflow-x-auto my-5 pb-1 custom-scrollbar cursor-pointer">
        <div className="flex flex-nowrap justify-start lg:justify-center items-center gap-1">
          {categories.map(({ path, icon, label }) => (
            <a
              key={path}
              href={path}
              onClick={(e) => handleClick(e, path)}
              className={`btn-category ${isActive(path) ? "active" : ""}`}
            >
              {icon} {label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryScroll;
