"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaRegStar } from "react-icons/fa6";

export default function RatingComponent({ articleId, authorId, userId }) {
  const router = useRouter();
  const [hoveredStar, setHoveredStar] = useState(0);
  const [selectedStar, setSelectedStar] = useState(0);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
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

  const handleSubmitRating = async () => {
    if (selectedStar === 0) {
      setError("Please select a rating before submitting.");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/articles/${articleId}/rate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            stars: selectedStar,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to submit rating");
      }

      setSuccess("Rating submitted successfully!");
      setError(null);
      router.refresh();
    } catch (err) {
      setError(err.message);
      setSuccess(null);
    }
  };

  return (
    <div className="flex flex-col items-start">
      {isLoggedIn ? (
        userId === authorId ? (
          <p className="text-yellow-600">
            Anda adalah penulis artikel ini dan tidak dapat memberikan rating.
          </p>
        ) : (
          <div>
            <p className="font-bold">Beri Rating:</p>
            <div className="flex flex-row">
              {Array.from({ length: 5 }, (_, index) => (
                <FaRegStar
                  key={index}
                  className={`cursor-pointer ${
                    index < hoveredStar || index < selectedStar
                      ? "text-primary"
                      : "hover:text-primary"
                  }`}
                  onMouseEnter={() => setHoveredStar(index + 1)}
                  onMouseLeave={() => setHoveredStar(0)}
                  onClick={() => setSelectedStar(index + 1)}
                />
              ))}
            </div>

            {hoveredStar > 0 && (
              <div className="flex flex-row">
                {Array.from({ length: 5 }, (_, index) => (
                  <span
                    key={index}
                    className={`mx-1 ${
                      index < hoveredStar ? "text-primary" : "text-gray-400"
                    }`}
                  ></span>
                ))}
              </div>
            )}

            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}

            <button
              className="mt-3 px-4 py-2 border bg-blue-500 text-white hover:text-blue-500 hover:bg-white rounded"
              onClick={handleSubmitRating}
            >
              Submit Rating
            </button>
          </div>
        )
      ) : (
        <p className="text-red-500">Silakan login untuk memberikan rating.</p>
      )}
    </div>
  );
}
